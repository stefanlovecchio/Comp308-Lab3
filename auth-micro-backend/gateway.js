// server/gateway.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { ApolloGateway } = require('@apollo/gateway');
require('dotenv').config();

// Initialize an Express application
const app = express();

// Configure the Apollo Gateway
const gateway = new ApolloGateway({
    serviceList: [
        { name: 'auth', url: 'http://localhost:3001/graphql' },
        { name: 'vital-signs', url: 'http://localhost:3002/graphql' },
    ],
});

const server = new ApolloServer({ gateway, subscriptions: false });

server.start().then(() => {
    server.applyMiddleware({ app });

     // Start the Express server
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});