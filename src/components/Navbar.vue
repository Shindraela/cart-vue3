<template>
	<n-space justify="center" align="center">
		<n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
		<div v-text="count"></div>
	</n-space>

	<Search :products="allProducts" />
</template>

<script setup lang="ts">
import { computed, h, ref } from 'vue'
import { RouterLink } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import { useCartStore } from '../stores/cart'
import Search from './Search.vue'
import { useProductStore } from '../stores/products'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const activeKey = ref('/')
const productStore = useProductStore()
const { allProducts } = storeToRefs(productStore)
const count = computed(() => cartStore.counter)

const menuOptions: MenuOption[] = [
	{
		label: () =>
			h(
				RouterLink,
				{
					to: {
						path: '/',
					},
				},
				{ default: () => 'Home' },
			),
		key: 'go-back-home',
	},
	{
		label: () =>
			h(
				RouterLink,
				{
					to: {
						path: '/cart',
					},
				},
				{ default: () => 'Cart' },
			),
		key: 'go-cart',
	},
]
</script>
