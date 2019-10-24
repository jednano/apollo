import { GraphQLResolverMap } from 'apollo-graphql'
export { gql } from 'apollo-server'
import { ContextFunction, Context } from 'apollo-server-core'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import { DocumentNode } from 'graphql'

import context from '../context'

/**
 * A convenience function to ensure your extension properly implements the
 * `Extension` interface. It also merges your `context` type with the root
 * context and feeds it into your resolvers, again, for convenience.
 */
export default function createExtension<T extends {} = {}>(
	options: Extension<T>,
) {
	return options
}

export interface Extension<T = object, U = T & typeof context> {
	context?: ContextFunction<ExpressContext, Context<T>> | Context<T>
	resolvers?: GraphQLResolverMap<Context<U>>
	typeDefs?: DocumentNode
}
