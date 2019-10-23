import { GraphQLResolverMap } from 'apollo-graphql'
import { Context } from 'apollo-server-core'

type T<TContext = any> = GraphQLResolverMap<Context<TContext>>

/**
 * Extends the `firstResolvers` map with `moreResolvers`, ensuring the
 * `firstResolvers` are extended and not overwritten in the process.
 */
export default function extendResolvers<
	T1 extends T,
	T2 extends T,
	R1 = T1 extends T<infer TContext> ? T<TContext> : never,
	R2 = T2 extends T<infer TContext> ? T<TContext> : never
>(firstResolvers: R1, moreResolvers: R2) {
	return Object.keys(firstResolvers).reduce((resolvers, key) => {
		resolvers[key as keyof R2] = {
			...resolvers[key as keyof R2],
			...firstResolvers[key as keyof R1],
		}
		return resolvers
	}, moreResolvers) as R2 & R1
}
