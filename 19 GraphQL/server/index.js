const express = require("express");
const { ApolloServer } = require("@apollo/server");
const cors = require("cors");
const bodyParser = require("body-parser");
const { expressMiddleware } = require("@as-integrations/express5");
const { default: axios } = require("axios");

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `type Todo{
    id: ID!,
    title: String!,
    completed: Boolean
    }
    
    type Query{
    getTodos: [Todo]
    }

    `,
    resolvers: {
      Query: {
        getTodos: async () => {
          //   let todos = [
          //     { id: 1, title: "Get driving license!!", completed: false },
          //   ];

          let response = await axios.get(
            "https://jsonplaceholder.typicode.com/todos",
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
