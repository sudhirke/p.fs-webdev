const express = require("express");
const { ApolloServer } = require("@apollo/server");
const cors = require("cors");
const bodyParser = require("body-parser");
const { expressMiddleware } = require("@as-integrations/express5");
const { default: axios } = require("axios");

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
    
    type User{
    id:ID!,
    name:String!,
    userName: String!,
    email: String!,
    phone: String!,
    website: String!
    }

    type Todo{
    id: ID!,
    title: String!,
    completed: Boolean,
    userId: ID,
    user: User
  }
    
    type Query{
    getTodos: [Todo],
    getAllUsers: [User],
    getUser(id:ID!):User
    }

    `,
    resolvers: {
      Todo: {
        user: async (todo) => {
          let response = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${todo.userId}`,
          );
          return response.data;
        },
      },
      Query: {
        getTodos: async () => {
          let response = await axios.get(
            "https://jsonplaceholder.typicode.com/todos",
          );
          return response.data;
        },

        getAllUsers: async () => {
          let response = await axios.get(
            "https://jsonplaceholder.typicode.com/users",
          );
          return response.data;
        },

        getUser: async (parent, { id }) => {
          let response = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${id}`,
          );
          return response.data;
        },
      },
    },
  });
  const PORT = 3000;

  //middleware
  app.use(bodyParser.json());
  app.use(cors());

  //start graphQL server
  await server.start();

  //use express Middleware from server
  app.use("/graphql", expressMiddleware(server));

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
