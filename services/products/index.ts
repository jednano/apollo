import { buildFederatedSchema } from '@apollo/federation'
import { ApolloServer } from 'apollo-server'
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
import extensions from './extensions'
import rootResolvers from './resolvers'
import extendResolvers from './utils/extendResolvers'

async function run() {
	const server = new ApolloServer({
		schema: buildFederatedSchema([
			{
				typeDefs: {
					definitions: myTypeDefs.definitions.concat(
						...extensions.flatMap(p => p.typeDefs?.definitions || []),
					),
					kind: 'Document',
					loc: myTypeDefs.loc,
				},
				resolvers: extensions
					.reverse()
					.map(e => e.resolvers)
					.filter(Boolean)
					.reduce(
						(result, more) => extendResolvers(result, more),
						rootResolvers,
					),
			},
		]),
		context: {
			...extensions
				.map(e => e.context)
				.filter(Boolean)
				.reduce((x, y) => ({ ...x, ...y }), {}),
			...context,
		},
	})
	return server
		.listen(pickBy({ port: process.argv[2] }))
		.then(({ url, server }: { url: string; server: Server }) => {
			console.log(`🚀 Server ready at ${url}`)
			server.on('close', gracefulExit)
		})
}

run().catch(console.error)
