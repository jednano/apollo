import { buildFederatedSchema } from '@apollo/federation'
import { ApolloServer, gql } from 'apollo-server'
import { Server } from 'http'
import { pickBy } from 'lodash'

import myTypeDefs from './schema.gql'

import { config } from 'dotenv'
const configResult = config({
	path: __dirname + '/.env',
})

if (configResult.error) {
	throw configResult.error
}

import context from './context'
import { gracefulExit } from './context/sql'
import * as resolvers from './resolvers'

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

const _typeDefs = gql`
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

async function run() {
	const server = new ApolloServer({
		schema: buildFederatedSchema([
			{
				typeDefs: {
					definitions: [
						...myTypeDefs.definitions,
						..._typeDefs.definitions,
					],
					kind: 'Document',
					loc: myTypeDefs.loc,
				},
				resolvers: {
					...resolvers,
					Product: {
						__resolveReference: (object: any) =>
							products.find(product => product.upc === object.upc),
					},
					Query: {
						...(resolvers as any).Query,
						topProducts: (_: any, args: any) =>
							products.slice(0, args.first),
					},
				},
			},
		]),
		context,
	})
	return server
		.listen(pickBy({ port: process.argv[2] }))
		.then(({ url, server }: { url: string; server: Server }) => {
			console.log(`🚀 Server ready at ${url}`)
			server.on('close', gracefulExit)
		})
}

run().catch(console.error)
