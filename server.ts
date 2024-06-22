import { graphql, buildSchema } from "graphql";
import express from "express";
import { createHandler } from "graphql-http/lib/use/express";

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The rootValue provides a resolver function for each API endpoint
const rootValue = {
  hello() {
    return "Hello world!";
  },
};

const app = express();

app.all("/graphql", createHandler({ schema, rootValue }));

// Start the server at port
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
