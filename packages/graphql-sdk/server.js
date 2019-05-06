// require('babel-polyfill')
const express = require('express')
// const graphqlHTTP = require('express-graphql')
const { schema } = require('./main')
const { ApolloServer, gql } = require('apollo-server-express')
const { LivepeerSDK } = require('@livepeer/sdk')
const { createServer } = require('http')

// Init express
const app = express()

const serve = async () => {
  // Get the livepeer sdk context
  const livepeer = await LivepeerSDK()

  // Create apollo server
  const server = new ApolloServer({
    schema,
    context: { livepeer },
  })

  // Apply the apollo middlewre to express
  server.applyMiddleware({ app, path: '/graphql' })

  // Create the server
  const httpServer = createServer(app)
  server.installSubscriptionHandlers(httpServer)

  // Init the port to the server
  // httpServer.listen( () => {
  return httpServer.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql')
  })
}

// Expose for Zeit
// module.exports = serve()

// Serve locally
serve()
