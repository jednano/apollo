import { ApolloServer, gql } from 'apollo-server'
import { buildFederatedSchema } from '@apollo/federation'
import { pickBy } from 'lodash'

const typeDefs = gql`
	extend type Query {
		me: User
	}

	type User @key(fields: "id") {
		id: ID!
		name: String
		username: String
	}
`

const resolvers = {
	Query: {
		me() {
			return users[0]
		},
	},
	User: {
		__resolveReference(object: { id: string }) {
			return users.find(user => user.id === object.id)
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

const users = [
	{
		id: '1',
		name: 'Ada Lovelace',
		birthDate: '1815-12-10',
		username: '@ada',
	},
	{
		id: '2',
		name: 'Alan Turing',
		birthDate: '1912-06-23',
		username: '@complete',
	},
]
