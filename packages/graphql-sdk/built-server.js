'use strict'

var _regenerator = require('babel-runtime/regenerator')

var _regenerator2 = _interopRequireDefault(_regenerator)

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator')

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

// require('babel-polyfill');
var express = require('express')
// const graphqlHTTP = require('express-graphql')

var _require = require('./main'),
  schema = _require.schema

var _require2 = require('apollo-server-express'),
  ApolloServer = _require2.ApolloServer,
  gql = _require2.gql

var _require3 = require('@livepeer/sdk'),
  LivepeerSDK = _require3.LivepeerSDK

var _require4 = require('http'),
  createServer = _require4.createServer

// Init express

var app = express()

var serve = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    /*#__PURE__*/ _regenerator2.default.mark(function _callee() {
      var livepeer, server, httpServer
      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2
                return LivepeerSDK()

              case 2:
                livepeer = _context.sent

                // Create apollo server
                server = new ApolloServer({
                  schema: schema,
                  context: { livepeer: livepeer },
                })

                // Apply the apollo middlewre to express

                server.applyMiddleware({ app: app, path: '/graphql' })

                // Create the server
                httpServer = createServer(app)

                server.installSubscriptionHandlers(httpServer)

                // Init the port to the server
                // httpServer.listen( () => {
                httpServer.listen({ port: 8000 }, function() {
                  console.log('Apollo Server on http://localhost:8000/graphql')
                })

              case 8:
              case 'end':
                return _context.stop()
            }
          }
        },
        _callee,
        undefined,
      )
    }),
  )

  return function serve() {
    return _ref.apply(this, arguments)
  }
})()

// Expose for Zeit
// module.exports = serve()

// Serve locally
serve()
