import figlet from "figlet";
import index from "./src/index.html";
import { parseArgs } from "util";

//Parse the launch args from the command line
const args = parseArgs({
  options: {
    port: {
      type: "string",
      short: "p",
    },
  },
});

const server = Bun.serve({
  port: args.values.port || 3000,
  routes: {
    "/": index,
    "/headers": (request) =>
      Response.json(request.headers, {
        status: 200,
      }),
    "/users": {
      GET: () => new Response("GET/Users from Bun!"),
      POST: async (request) => {
        const data = await request.json();
        return new Response(`Received data: ${JSON.stringify(data)}`);
      },
    },
    "/users/:id": {
      GET: (request) => {
        const { id } = request.params;
        return new Response(`GET/User with ID: ${id}`);
      },
      PUT: async (request) => {
        const { id } = request.params;
        const data = await request.json();
        return new Response(
          `Updated User with ID: ${id}, Data: ${JSON.stringify(data)}`,
        );
      },
      DELETE: (request) => {
        const { id } = request.params;
        return new Response(`Deleted User with ID: ${id}`);
      },
    },
    "/figlet": async () => {
      const text = figlet.textSync("Bun is fun!");
      return new Response(text, {
        headers: {
          "Content-Type": "text/plain",
        },
      });
    },
    "/dev": () => new Response("Sudhir Kesharwani!"),
    "/dashboard": () =>
      new Response(Bun.file("./public/images/dashboard-example.png")),
    "/org": () => new Response("SPXPERT Solutions OPC!"),
    "/linkedin": () =>
      Response.redirect("https://www.linkedin.com/in/sudhir-kesharwani/"),
    "/posts": {
      GET: async (request) => {
        if (!Bun.env.API_BASE) {
          return Response.json(
            { message: "API KEY not found!!!" },
            { status: 400 },
          );
        }

        //Call the API to get response then wait for rhe json Response
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
        );
        const data = await response.json();

        //return the json response
        return Response.json(data);
      },
    },
  },

  fetch(Request) {
    //static page for Not found
    return new Response(Bun.file("./src/404.html"), {
      status: 404,
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
});

console.log(`Server Listening on ${server.url}`);
console.log(Bun.env.API_BASE);
