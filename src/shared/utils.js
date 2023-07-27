const URLS = {
	HOMEPAGE: '/',
	SIGNUP: '/signup',
	LOGIN: '/login',
	CART: '/cart',
	PRODUCTS: '/products',
	PROFILE: '/profile',
}

const formatter = new Intl.NumberFormat('fr-FR', {
	style: 'currency',
	currency: 'EUR',
})
const toCurrency = value => formatter.format(value)

const formattedCart = (products, purchase) => {
	const currentProduct = products.find(p => p.id === purchase.productId)

	return {
		id: purchase.productId,
		image: currentProduct.images[0],
		title: currentProduct.title,
		quantity: purchase.quantity,
		cost: purchase.quantity * currentProduct.price,
	}
}

export { URLS, toCurrency, formattedCart }
