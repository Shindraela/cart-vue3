export interface IPurchase {
	productId: number
	quantity: number
}

export interface CartState {
	contents: Record<string, IPurchase>
}

export interface CartPreview {
	id: number
	image: string
	title: string
	quantity: number
	cost: number
}
