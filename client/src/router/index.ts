import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/DashboardPage.vue'),
    },
    {
      path: '/whitepaper',
      name: 'whitepaper',
      component: () => import('@/views/WhitepaperPage.vue'),
    },
    {
      path: '/activity',
      name: 'activity',
      component: () => import('@/views/ProblemPage.vue'),
    },
    {
      path: '/problem',
      redirect: '/activity',
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: () => import('@/views/LeaderboardPage.vue'),
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
      path: '/rewards',
      name: 'rewards',
      component: () => import('@/views/RewardsPage.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/AdminPage.vue'),
    },
  ],
})

export default router
