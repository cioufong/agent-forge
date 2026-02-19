import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/DashboardPage.vue'),
    },
    {
      path: '/mint',
      name: 'mint',
      component: () => import('@/views/MintAgentPage.vue'),
    },
    {
      path: '/agent/:tokenId',
      name: 'agent-profile',
      component: () => import('@/views/AgentProfilePage.vue'),
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: () => import('@/views/LeaderboardPage.vue'),
    },
    {
      path: '/rewards',
      name: 'rewards',
      component: () => import('@/views/RewardsPage.vue'),
    },
  ],
})

export default router
