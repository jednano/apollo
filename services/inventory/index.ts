import { ApolloServer, gql } from 'apollo-server'
import { buildFederatedSchema } from '@apollo/federation'
import { pickBy } from 'lodash'

const typeDefs = gql`
	extend type Product @key(fields: "upc") {
		upc: String! @external
		weight: Int @external
		price: Int @external
		inStock: Boolean
		shippingEstimate: Int @requires(fields: "price weight")
	}
`

const resolvers = {
	Product: {
		__resolveReference(object: { upc: string }) {
			return {
				...object,
				...inventory.find(product => product.upc === object.upc),
			}
		},
		shippingEstimate(object: { price: number; weight: number }) {
			// free for expensive items
			if (object.price > 1000) return 0
			// estimate is based on weight
			return object.weight * 0.5
		},
	},
}

const server = new ApolloServer({
	schema: buildFederatedSchema([
		{
			typeDefs,
			resolvers,
		},
	]),
})

export default server
	.listen(pickBy({ port: process.argv[2] }))
	.then(({ url }) => {
		console.log(`🚀 Server ready at ${url}`)
	})
	.catch(console.error)

const inventory = [
	{ upc: '1', inStock: true },
	{ upc: '2', inStock: false },
	{ upc: '3', inStock: true },
]
