<template>
	<div>
		<n-button @click="$router.go(-1)" color="purple" class="back-btn">Go back</n-button>

		<div v-if="product">
			<figure v-if="product.images">
				<img :src="product.images[0]" alt="Card Image" />
			</figure>

			<div class="card-body">
				<h2 class="card-title" v-text="product.title"></h2>
				<p v-text="product.description"></p>
				<p>{{ toCurrency(product.price) }}</p>

				<div class="card-actions">
					<button class="btn btn-primary" @click="cartStore.add(product.id)">Add to Cart</button>
				</div>
			</div>
		</div>

		<div v-else>
			<h1>No product found with id {{ route.params.productId }}</h1>
		</div>
	</div>
</template>

<script>
import { defineComponent, computed, ref, toRaw } from 'vue'
import { useRoute } from 'vue-router'

import { useCartStore } from '../stores/cart'
import { useProductStore } from '../stores/products'
import { toCurrency } from '../shared/utils'
import { BASE_URL } from '../shared/constants'

export default defineComponent({
	name: 'Product',
	setup() {
		const route = useRoute()
		const cartStore = useCartStore()
		const productStore = useProductStore()
		const product = ref({})

		const fetchProduct = async () => {
			try {
				const response = await fetch(`${BASE_URL}/products/${route.params.id}`)
				const json = await response.json()
				console.log('json :', json)
				product.value = json
			} catch (error) {
				console.error(error)
			}
		}
		fetchProduct()

		return {
			product,
			cartStore,
			toCurrency,
		}
	},
})
</script>
