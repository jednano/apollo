import { ApolloServer } from 'apollo-server'
import { importSchema } from 'graphql-import'

const typeDefs = importSchema('src/schema.graphql')

const resolvers = {
	ProductInterface: {
		__resolveType: () => 'SimpleProduct',
	},
	Query: {
		products: (_product: any, _args: any, context: any) => ({
			items: [
				{
					name: context.elasticsearch(),
				},
			],
		}),
	},
}

function elasticsearch() {
	return 'baz'
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: {
		elasticsearch,
	},
})

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`)
})
