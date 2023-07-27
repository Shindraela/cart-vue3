<template>
	<div>
		<div>404</div>
		<h2>Oops. Nothing here...</h2>

		<n-button color="white" @click="$router.push(-1)">Go Home</n-button>
	</div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ErrorNotFound',
})
</script>
