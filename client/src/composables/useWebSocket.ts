import { ref, onUnmounted } from 'vue'
import { io, type Socket } from 'socket.io-client'

let socket: Socket | null = null
const isConnected = ref(false)

function getSocket(): Socket {
  if (!socket) {
    socket = io({
      transports: ['websocket', 'polling'],
    })

    socket.on('connect', () => {
      isConnected.value = true
      console.log('🔌 Socket.IO connected')
    })

    socket.on('disconnect', () => {
      isConnected.value = false
      console.log('🔌 Socket.IO disconnected')
    })
  }
  return socket
}

export function useWebSocket() {
  const s = getSocket()

  function on(event: string, handler: (...args: any[]) => void) {
    s.on(event, handler)
  }

  function off(event: string, handler: (...args: any[]) => void) {
    s.off(event, handler)
  }

  return {
    socket: s,
    isConnected,
    on,
    off,
  }
}
