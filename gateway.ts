import { ApolloServer } from 'apollo-server'
import { ApolloGateway } from '@apollo/gateway'

const gateway = new ApolloGateway({
	serviceList: [
		{ name: 'products', url: 'http://localhost:4001' },
		{ name: 'reviews', url: 'http://localhost:4002' },
		{ name: 'accounts', url: 'http://localhost:4003' },
		{ name: 'inventory', url: 'http://localhost:4004' },
	],
})

const server = new ApolloServer({
	gateway,

	// Currently, subscriptions are enabled by default with Apollo Server, however,
	// subscriptions are not compatible with the gateway.  We hope to resolve this
	// limitation in future versions of Apollo Server.  Please reach out to us on
	// https://spectrum.chat/apollo/apollo-server if this is critical to your adoption!
	subscriptions: false,
})

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`)
})
