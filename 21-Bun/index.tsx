import figlet from "figlet";
import index from "./src/index.html";

const server = Bun.serve({
  port: 3000,
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
