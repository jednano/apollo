import context from '../context'
import { GraphQLFieldResolver } from 'graphql'

type Resolver<TSource = any> = Record<
	string,
	| GraphQLFieldResolver<TSource, typeof context>
	| {
			requires?: string
			resolve: GraphQLFieldResolver<TSource, typeof context>
	  }
>

export default Resolver
