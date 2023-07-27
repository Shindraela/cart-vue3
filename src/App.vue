<template>
	<n-space vertical>
		<Navbar />
		<router-view></router-view>
	</n-space>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import { usePersistCart } from './shared/usePersistCart'
import { useProductStore } from './stores/products'

const productStore = useProductStore()
productStore.fetchAll()
usePersistCart()
</script>
