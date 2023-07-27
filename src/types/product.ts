import ICategory from './category'

export interface IProduct {
	id: number
	title: string
	price: number
	description: string
	category: {
		name: string
	}
	images: string
}

export interface ProductState {
	items: Record<string, IProduct>
	productIds: number[]
	categories: ICategory[]
	allProducts: IProduct[]
}
