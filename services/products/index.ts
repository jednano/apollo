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
import plugins from './plugins'
import rootResolvers from './resolvers'
import extendResolvers from './utils/extendResolvers'

async function run() {
	const server = new ApolloServer({
		schema: buildFederatedSchema([
			{
				typeDefs: {
					definitions: myTypeDefs.definitions.concat(
						...plugins.flatMap(p => p.typeDefs?.definitions || []),
					),
					kind: 'Document',
					loc: myTypeDefs.loc,
				},
				resolvers: plugins
					.reverse()
					.map(p => p.resolvers)
					.filter(Boolean)
					.reduce(
						(result, more) => extendResolvers(result, more),
						rootResolvers,
					),
			},
		]),
		context: {
			...plugins
				.map(p => p.context)
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
