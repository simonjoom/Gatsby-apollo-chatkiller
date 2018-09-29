
import { importSchema } from 'graphql-import'
import { ApolloServer } from 'apollo-server'
//const { ApolloServer } = require('apollo-server')
//import { Prisma } from './prisma-client'
import { Prisma } from './generated/prisma'
import { resolvers } from './resolvers'
/*
const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const resolvers = require('./src/resolvers')*/

const db = new Prisma({
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  // debug: true,
})

const typeDefs = importSchema("src/schema.graphql")
 
const server = new ApolloServer({
  typeDefs,
  subscriptions: "/subscriptions",
  resolvers, 
  context: req => ({ ...req, db }),
} as any)
/*
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'generated-schema.graphql',
      // endpoint: 'http://localhost:4466/naperg/dev'
      endpoint: 'https://eu1.prisma.sh/williamimoh/skiscool/dev'
    })
  })
})

const options = {
// playground: null, // Dissable playground endpoint,
// playground: '/docs/, // Move playground to /docs/,
}
*/
/*
server..get(server.options.endpoint + 'user', (req, res, done) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    message: 'Message from graphql-yoga (Express API)',
    obj: 'You can use graphql-yoga as a simple REST API'
  })
})
*/

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})

//server.start(options, () => { console.log('Server is running on http://localhost:4000') })
