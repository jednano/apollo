import { IResolverObject } from 'graphql-tools'

import context from '../context'

type Resolver<TSource = any> = IResolverObject<TSource, typeof context>

export default Resolver
