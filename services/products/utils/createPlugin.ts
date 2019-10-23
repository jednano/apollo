import { GraphQLResolverMap } from 'apollo-graphql'
import { ContextFunction, Context } from 'apollo-server-core'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import { DocumentNode } from 'graphql'

import context from '../context'

export default function createPlugin<T>(options: Plugin<T>) {
	return options
}

export interface Plugin<T = object, U = T & typeof context> {
	context?: ContextFunction<ExpressContext, Context<T>> | Context<T>
	resolvers?: GraphQLResolverMap<Context<U>>
	typeDefs?: DocumentNode
}
