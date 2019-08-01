import Resolver from '../types/Resolver'

const Query: Resolver = {
	products: async (
		_product,
		{ search }: { search: string },
		{ elasticsearch },
	) => {
		const items = await elasticsearch({ name: search })
		return { items }
	},
}

export default Query
