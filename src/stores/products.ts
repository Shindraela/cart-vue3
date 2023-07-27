import { defineStore } from 'pinia'
import { BASE_URL } from '../shared/constants'
import { IProduct, ProductState } from '../types/product'

export const useProductStore = defineStore('products', {
	state: (): ProductState => ({
		items: {},
		productIds: [],
		categories: [],
		allProducts: [],
	}),

	getters: {
		list: (state): IProduct[] => state.productIds.map(i => state.items[i]),
		loaded: state => state.allProducts.length > 0,
		loadCategories: state => new Set(state.categories),
	},

	actions: {
		async fetchAll() {
			if (this.loaded) return
			const res = await fetch(`${BASE_URL}/products`)
			const data = await res.json()
			this.allProducts = data

			const catRes = await fetch(`${BASE_URL}/categories`)
			const catData = await catRes.json()
			this.categories = catData
		},
	},
})
