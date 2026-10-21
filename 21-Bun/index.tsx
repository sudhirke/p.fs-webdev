import figlet from "figlet";
import index from "./src/index.html";

const server = Bun.serve({
  port: 3000,
  routes: {
    "/": index,
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
    "/org": () => new Response("SPXPERT Solutions OPC!"),
  },
  fetch(Request) {
    //return new Response("Not Found", { status: 404 });
    return new Response(Bun.file("./src/404.html"), {
      status: 404,
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
});

console.log(`Listening on ${server.url}`);
