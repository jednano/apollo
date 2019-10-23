import { GraphQLResolverMap } from 'apollo-graphql'
import { ContextFunction, Context } from 'apollo-server-core'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import { DocumentNode } from 'graphql'

export default interface Plugin<T = object> {
	context?: ContextFunction<ExpressContext, Context<T>> | Context<T>
	resolvers?: GraphQLResolverMap<Context<T>>
	typeDefs?: DocumentNode
}
