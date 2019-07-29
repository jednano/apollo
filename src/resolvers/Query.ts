import Resolver from '../types/Resolver'

const Query: Resolver = {
	products: async (_product, { search }, { elasticsearch, mysql }) => ({
		items: (await elasticsearch({
			name: search,
		})).map(async item => ({
			...item,
			name: JSON.stringify(await mysql('SHOW TABLES')),
		})),
	}),
}

export default Query
