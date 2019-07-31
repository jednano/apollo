import Resolver from '../types/Resolver'

const Query: Resolver = {
	products: async () => ({
		items: [
			{ name: 'Pink Shirt', sku: 'pink_shirt' },
			{ name: 'Blue Shirt', sku: 'blue_shirt' },
		],
	}),
}

export default Query
