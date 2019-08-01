import { buildFederatedSchema } from '@apollo/federation'
import { ApolloServer, gql } from 'apollo-server'
import { Server } from 'http'
import { pickBy } from 'lodash'

import { config } from 'dotenv'
config()

const products = [
	{
		upc: '1',
		name: 'Table',
		price: 899,
		weight: 100,
		foo: 'baz',
	},
	{
		upc: '2',
		name: 'Couch',
		price: 1299,
		weight: 1000,
	},
	{
		upc: '3',
		name: 'Chair',
		price: 54,
		weight: 50,
	},
]

const typeDefs = gql`
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
`

const resolvers = {
	Product: {
		__resolveReference: (object: any) =>
			products.find(product => product.upc === object.upc),
	},
	Query: {
		topProducts: (_: any, args: any) => products.slice(0, args.first),
	},
}

async function run() {
	const server = new ApolloServer({
		schema: buildFederatedSchema([
			{
				typeDefs,
				resolvers,
			},
		]),
	})
	return server
		.listen(pickBy({ port: process.argv[2] }))
		.then(({ url }: { url: string; server: Server }) => {
			console.log(`🚀 Server ready at ${url}`)
		})
}

export default run().catch(console.error)
