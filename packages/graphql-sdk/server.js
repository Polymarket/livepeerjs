require( 'babel-polyfill' )
const express = require( 'express' )
// const graphqlHTTP = require('express-graphql')
const { schema } = require( './main' )
const { ApolloServer, gql } = require( 'apollo-server-express' );
const { LivepeerSDK } = require( '@livepeer/sdk' );
const { createServer } = require( 'http' );
const app = express();

const serve = async () => {
  const livepeer = await LivepeerSDK();
  // Your Livepeer SDK instance is now ready to use
  // app.use(
  //   '/',
  //   graphqlHTTP( req => ( {
  //     schema,
  //     context: { livepeer },
  //     graphiql: true,
  //   } ) ),
  // )
  const server = new ApolloServer( {
    schema,
    context: { livepeer },
  } )
  server.applyMiddleware( { app, path: '/graphql' } );
  const httpServer = createServer( app );
  server.installSubscriptionHandlers( httpServer );
  httpServer.listen( () => {
    // httpServer.listen( { port: 8000 }, () => {
    console.log( 'Apollo Server on http://localhost:8000/graphql' );
  } );
  // app.listen( 4000, () => {
  //   console.log( 'GraphiQL server running at http://localhost:4000' )
  // } )
};

module.exports = serve()
// serve()
