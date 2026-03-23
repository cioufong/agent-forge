/**
 * Event Polling Composable
 * Replaces WebSocket with REST polling for /api/events
 * Polls every 5 seconds for new events
 */

import { ref, onUnmounted } from 'vue'
import { API_BASE } from '@/config/api'

type EventHandler = (data: any) => void

interface ServerEvent {
  id: number
  type: string
  data: string
  created_at: number
}

const POLL_INTERVAL = parseInt(import.meta.env.VITE_POLL_INTERVAL || '5000', 10)

let lastEventTimestamp = 0
let pollTimer: ReturnType<typeof setInterval> | null = null
const handlers: Map<string, Set<EventHandler>> = new Map()
const isPolling = ref(false)

function startPolling() {
  if (pollTimer) return
  isPolling.value = true

  const poll = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/events?since=${lastEventTimestamp}`)
      if (!res.ok) return
      const events: ServerEvent[] = await res.json()

      for (const event of events) {
        if (event.created_at > lastEventTimestamp) {
          lastEventTimestamp = event.created_at
        }
        let data: any
        try {
          data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data
        } catch (parseErr) {
          console.warn(`[poll] Malformed event data for event #${event.id}, skipping:`, parseErr)
          continue
        }
        const typeHandlers = handlers.get(event.type)
        if (typeHandlers) {
          for (const handler of typeHandlers) {
            handler(data)
          }
        }
      }
    } catch { /* ignore polling errors */ }
  }

  poll()
  pollTimer = setInterval(poll, POLL_INTERVAL)
}

function stopPolling() {
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
  }
  isPolling.value = false
}

export function useWebSocket() {
  function on(event: string, handler: EventHandler) {
    if (!handlers.has(event)) handlers.set(event, new Set())
    handlers.get(event)!.add(handler)
    startPolling()
  }

  function off(event: string, handler: EventHandler) {
    handlers.get(event)?.delete(handler)
    // Stop polling if no handlers remain
    let totalHandlers = 0
    for (const set of handlers.values()) totalHandlers += set.size
    if (totalHandlers === 0) stopPolling()
  }

  return {
    isConnected: isPolling,
    on,
    off,
  }
}
