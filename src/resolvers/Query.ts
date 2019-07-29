import Resolver from '../types/Resolver'

const Query: Resolver = {
	products: async (_product, args, context) => ({
		items: await context.search({
			name: args.search,
		}),
	}),
}

export default Query
