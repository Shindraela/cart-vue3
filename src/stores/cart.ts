import { defineStore } from 'pinia'
import { CART_STORAGE } from '../shared/usePersistCart'
import { useProductStore } from './products'
import { CartState } from '../types/cart'
import { toRaw } from 'vue'

export const useCartStore = defineStore('cart', {
	state: (): CartState => ({
		contents: JSON.parse(localStorage.getItem(CART_STORAGE) as string) ?? {},
	}),

	getters: {
		counter: (state): number => {
			return Object.keys(state.contents).reduce((acc, id) => {
				return acc + state.contents[id].quantity
			}, 0)
		},
		total: (state): number => {
			const productStore = useProductStore()

			return Object.keys(state.contents).reduce((acc, id) => {
				return acc + productStore.allProducts[id].price * state.contents[id].quantity
			}, 0)
		},
		formattedCart: state => {
			const products = useProductStore()

			return Object.keys(state.contents).map(productId => {
				const purchase = state.contents[productId]
				const currentProduct = toRaw(products.allProducts[purchase.productId])

				return {
					id: purchase.productId,
					image: currentProduct.images[0],
					title: currentProduct.title,
					quantity: purchase.quantity,
					cost: purchase.quantity * currentProduct.price,
				}
			})
		},
	},

	actions: {
		add(productId: number) {
			if (this.contents[productId]) {
				this.contents[productId].quantity += 1
			} else {
				this.contents[productId] = {
					productId,
					quantity: 1,
				}
			}
		},
		remove(productId: number) {
			if (!this.contents[productId]) {
				return
			}

			this.contents[productId].quantity -= 1

			if (this.contents[productId].quantity === 0) {
				delete this.contents[productId]
			}
		},
		removeAll() {
			return Object.keys(this.contents).forEach(productId => {
				delete this.contents[productId]
			})
		},
	},
})
