import { ApolloServer } from 'apollo-server'
import { Server } from 'http'
import { importSchema } from 'graphql-import'

import { config } from 'dotenv'
config()

import context from './context'
import { gracefulExit } from './context/sql'
import * as resolvers from './resolvers'

async function run() {
	const server = new ApolloServer({
		typeDefs: importSchema('src/schema.graphql'),
		resolvers,
		context,
	})
	return server
		.listen()
		.then(({ url, server }: { url: string; server: Server }) => {
			console.log(`🚀 Server ready at ${url}`)
			server.on('close', gracefulExit)
		})
}

run().catch(console.error)
