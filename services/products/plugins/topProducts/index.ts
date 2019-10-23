import { gql } from 'apollo-server'

import Plugin from '../Plugin'
import products = require('./products.json')

const plugin: Plugin = {
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
}

export default plugin
