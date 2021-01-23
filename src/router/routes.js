
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [			
			{ path: '/', component: () => import('pages/PageCallPageOld.vue') },
			{ path: '/call-page-vip', component: () => import('pages/PageCallPage.vue') },
			{ path: '/databaza', component: () => import('pages/PageDatabaza.vue') },
			// { path: '/contact', component: () => import('pages/PageContact.vue') },
			// { path: '/todo', component: () => import('pages/PageTodo.vue') },
			// { path: '/settings', component: () => import('pages/PageSettings.vue') },			
			// { path: '/test', component: () => import('pages/PageTest.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes