<template>
	<div v-show="!productStore.loaded">Loading...</div>

	<n-space>
		<n-button v-show="productStore.loaded" @click="categoryName = 'all'">All</n-button>

		<n-space horizontal v-for="(category, index) in categories" :key="index">
			<n-button @click="setCategory(category.name)">{{ category.name }}</n-button>
		</n-space>

		<n-grid cols="1 s:2 m:3 l:4 xl:4 2xl:4" x-gap="12" y-gap="12" responsive="screen">
			<n-gi v-for="product in filteredProducts">
				<ProductCard :key="product.id" :product="product" />
			</n-gi>
		</n-grid>
	</n-space>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import ProductCard from '../components/ProductCard.vue'
import { useProductStore } from '../stores/products'

const productStore = useProductStore()
const { allProducts } = storeToRefs(productStore)
const categories = computed(() => productStore.loadCategories)
let categoryName = ref('all')

const setCategory = name => (categoryName.value = name)

const filteredProducts = computed(() => {
	return categoryName.value === 'all'
		? allProducts.value
		: allProducts.value.filter(product => product.category.name === categoryName.value)
})
</script>
