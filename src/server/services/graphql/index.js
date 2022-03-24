import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';

/**
 * Combine the GraphQL schema with the resolver functions.
 * GraphQL schema: representation of the API (data and functions)
 * Resolver functions: implementation of the schema
 * both need to match!
 */
import Resolvers from './resolvers';
import Schema from './schema';

/**
 * makeExecutableSchema is merging schema and resolver functions.
 * - resolving the data we are going to write
 * - throws an error when you define a query or mutation that is not in the schema
 * - resulting schema is executed by our GraphQL server, 
 *   resolving the data or running the mutations we request
 */
const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers
});

/**
 * We pass this as a schema parameter to the Apollo Server. 
 * The context property contains the request object of Express.js. 
 * In our resolver functions, we can access the request if we need to:
 */
const server = new ApolloServer({
  schema: executableSchema,
  context: ({ req }) => req
});

export default server;
/**
 * Now that we are exporting the Apollo Server, it needs to be imported somewhere else.
    I find it convenient to have one index.js file on the services layer so that 
    we only rely on this file if a new service is added.
   will be imported in services/index.js
 */