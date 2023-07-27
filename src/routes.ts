import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Product from './pages/Product.vue'
import Cart from './pages/Cart.vue'

const routes = [
	{ path: '/', component: Home },
	{ path: '/products/:id', component: Product, props: true },
	{ path: '/cart', component: Cart },
	{
		path: '/:catchAll(.*)*',
		component: () => import('./pages/ErrorNotFound.vue'),
	},
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})
