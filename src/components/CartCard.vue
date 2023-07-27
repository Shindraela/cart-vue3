<template>
	<n-card class="my-card">
		<div horizontal>
			<figure>
				<img :src="cartItem.image" :alt="cartItem.title" />
			</figure>

			<div class="product-descr">
				<h6>
					<router-link :to="`/products/${cartItem.id}`">{{ cartItem.title }}</router-link>
				</h6>
				<p>{{ toCurrency(cartItem.cost) }} et ID {{ cartItem.id }}</p>

				<div>
					<div>
						<n-button flat @click="cartStore.remove(cartItem.id)"> - </n-button>
						<n-button flat>
							{{ cartItem.quantity }}
						</n-button>
						<n-button flat @click="cartStore.add(cartItem.id)"> + </n-button>
					</div>
				</div>
			</div>
		</div>
	</n-card>
</template>

<script>
import { defineComponent, computed, toRaw } from 'vue'
import { storeToRefs } from 'pinia'
import { toCurrency } from '../shared/utils'
import { useCartStore } from '../stores/cart'
import { useProductStore } from '../stores/products'

export default defineComponent({
	name: 'CartCard',
	props: {
		cartItem: Object,
	},
	setup(props) {
		const cartStore = useCartStore()

		return {
			cartStore,
			toCurrency,
		}
	},
})
</script>

<style scoped lang="scss">
.my-card {
	width: 100%;
	max-width: 350px;

	figure {
		display: flex;
		flex: 0 0 20%;
		align-items: center;

		img {
			width: 100%;
			object-fit: contain;
			aspect-ratio: 13/9;
		}
	}

	.product-descr {
		flex: 1 1 auto;
	}

	@media screen and (min-width: 768px) {
		max-width: 600px;
	}
}
</style>
