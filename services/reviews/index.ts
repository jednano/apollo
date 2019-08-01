import { ApolloServer, gql } from 'apollo-server'
import { buildFederatedSchema } from '@apollo/federation'
import { pickBy } from 'lodash'

const typeDefs = gql`
	type Review @key(fields: "id") {
		id: ID!
		body: String
		product: Product
	}

	extend type Product @key(fields: "upc") {
		upc: String! @external
		reviews: [Review]
	}
`

const resolvers = {
	Review: {
		author(review: any) {
			return { __typename: 'User', id: review.authorID }
		},
	},
	Product: {
		reviews(product: any) {
			return reviews.filter(review => review.product.upc === product.upc)
		},
	},
}

const server = new ApolloServer({
	schema: buildFederatedSchema([
		{
			typeDefs,
			resolvers,
		},
	]),
})

export default server
	.listen(pickBy({ port: process.argv[2] }))
	.then(({ url }) => {
		console.log(`🚀 Server ready at ${url}`)
	})
	.catch(console.error)

const reviews = [
	{
		id: '1',
		authorID: '1',
		product: { upc: '1' },
		body: 'Love it!',
	},
	{
		id: '2',
		authorID: '1',
		product: { upc: '2' },
		body: 'Too expensive.',
	},
	{
		id: '3',
		authorID: '2',
		product: { upc: '3' },
		body: 'Could be better.',
	},
	{
		id: '4',
		authorID: '2',
		product: { upc: '1' },
		body: 'Prefer something else.',
	},
]
