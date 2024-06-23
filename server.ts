import { graphql, buildSchema } from "graphql";
import express from "express";
import { createHandler } from "graphql-http/lib/use/express";

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`

  type Hobby {
    hobbyId: Int
    name: String
  }


  type User {
    userId: Int
    name: String
    age: Int
    hobbies: [Hobby]
  }


  type Query {
    getUser(userId: Int!): User 
  }
`);

// The rootValue provides a resolver function for each API endpoint
const rootValue = {
  getUser({ userId }) {
    console.log(userId);
    return {
      userId,
      name: "Taro",
      age: 20,
      hobbies: [
        { hobbyId: 1, name: "soccer" },
        { hobbyId: 2, name: "baseball" },
      ],
    };
  },
};

const app = express();

app.all("/graphql", createHandler({ schema, rootValue }));

// Start the server at port
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");

const main = () => {
  const userId = 7;

  // dice と sides を変数として渡すために
  // $dice と $sides を指定してクエリを作成する。
  const query = `query GetUser($userId: Int!){
    getUser(userId:$userId){
      userId
      name
      age
      hobbies{
        name
      }
    }
  }`;

  const result = fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { userId }, // dice と sides を含むオブジェクトを渡す
    }),
  })
    .then((result) => {
      result.json().then((data) => {
        console.log(data);
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

main();
