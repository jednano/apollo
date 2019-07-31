import { ApolloServer } from 'apollo-server'
import { importSchema } from 'graphql-import'

import { config } from 'dotenv'
config()

import context from './context'
import * as resolvers from './resolvers'

async function run() {
	const server = new ApolloServer({
		typeDefs: importSchema('src/schema.graphql'),
		resolvers,
		context,
		playground: {
			settings: {
				'schema.polling.enable': false,
			},
		} as any,
	})
	return server.listen().then(({ url }) => {
		console.log(`🚀 Server ready at ${url}`)
	})
}

run().catch(console.error)
