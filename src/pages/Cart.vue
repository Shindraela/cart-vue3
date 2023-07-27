<template>
	<div>
		<div v-if="!currentCart.length">
			<h1>Cart is empty.</h1>
		</div>

		<div v-else v-for="(cartProduct, index) in cartStore.formattedCart">
			<CartCard :key="cartProduct.id" :cartItem="cartProduct" />
		</div>
		<div>Total: {{ toCurrency(cartStore.total) }}</div>
	</div>
</template>

<script>
import { defineComponent, computed, toRaw } from 'vue'
import { storeToRefs } from 'pinia'
import { toCurrency, formattedCart } from '../shared/utils'
import { useCartStore } from '../stores/cart'
import { useProductStore } from '../stores/products'
import CartCard from '../components/CartCard.vue'

export default defineComponent({
	name: 'Cart',
	components: {
		CartCard,
	},
	setup() {
		const cartStore = useCartStore()
		const productStore = useProductStore()
		const { allProducts } = storeToRefs(productStore)
		const currentCart = computed(() =>
			Object.keys(cartStore.contents).map(productId =>
				formattedCart(toRaw(allProducts.value), toRaw(cartStore.contents[productId])),
			),
		)

		return {
			cartStore,
			currentCart,
			toCurrency,
		}
	},
})
</script>
