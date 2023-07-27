<template>
	<n-card :title="product.title">
		<template #cover>
			<img :src="product.images[0]" :alt="product.title" />
		</template>
		<template #header-extra>
			<router-link :to="`/products/${product.id}`" :title="product.title">see</router-link>
		</template>

		<template #footer>
			<p>{{ toCurrency(product.price) }} et ID {{ product.id }}</p>
		</template>

		<template #action>
			<button color="blue" @click="cartStore.add(product.id)">Add to Cart</button>
		</template>
	</n-card>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { toCurrency } from '../shared/utils'

export default defineComponent({
	name: 'ProductCard',
	components: {},
	props: {
		product: Object,
	},
	setup(props) {
		const router = useRouter()
		const cartStore = useCartStore()

		const goToProductDetails = () => {
			router.push({
				name: 'Product',
				params: { id: props.product.id },
			})
		}

		return {
			cartStore,
			goToProductDetails,
			toCurrency,
		}
	},
})
</script>

<style scoped>
.light {
	height: 108px;
	background-color: rgba(0, 128, 0, 0.12);
}
</style>
