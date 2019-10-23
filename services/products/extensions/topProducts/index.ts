import createExtension, { gql } from '../../utils/createExtension'

import products = require('./products.json')

/**
 * A convenience function to ensure your extension properly implements the
 * `Extension` interface. It also merges your `context` type with the root
 * context and feeds it into your resolvers, again, for convenience.
 */
export default createExtension({
	typeDefs: gql`
		extend type Query {
			topProducts(first: Int = 5): [Product]
		}
		type Product @key(fields: "upc") {
			upc: String!
			name: String
			price: Int
			weight: Int
			foo: String
		}
	`,
	resolvers: {
		Product: {
			__resolveReference: (object: { upc: string }) =>
				products.find(product => product.upc === object.upc),
		},
		Query: {
			topProducts: (_: any, args: any) => products.slice(0, args.first),
		},
	},
})
