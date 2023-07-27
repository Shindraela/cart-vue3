<template>
	<n-auto-complete
		v-model:value="input"
		:input-props="{
			autocomplete: 'disabled',
		}"
		:disabled="!productStore.loaded"
		:options="searchResults"
		:on-select="event => goToProductDetails(event)"
		placeholder="Search..."
		clearable
	/>
</template>

<script>
import { defineComponent, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/products'

export default defineComponent({
	name: 'Search',
	components: {},
	props: {
		product: Array,
	},
	setup(props) {
		const router = useRouter()
		const productStore = useProductStore()
		const input = ref('')

		const searchResults = computed(() => {
			if (!input.value || input.value.length < 2) return []

			const matchedProducts = productStore.allProducts.filter(item =>
				item.title.toLowerCase().includes(input.value.toLowerCase()),
			)
			return matchedProducts.map(item => item.title)
		})

		const goToProductDetails = title => {
			const currentProduct = productStore.allProducts.filter(item =>
				item.title.toLowerCase().includes(title.toLowerCase()),
			)
			input.value = ''
			router.push(`/products/${currentProduct[0].id}`)
		}

		return {
			input,
			searchResults,
			productStore,
			goToProductDetails,
		}
	},
})
</script>
