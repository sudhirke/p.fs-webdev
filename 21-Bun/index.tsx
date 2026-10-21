const server = Bun.serve({
  port: 3000,
  routes: {
    "/": () => new Response("Bun!"),
    "/dev": () => new Response("Sudhir Kesharwani!"),
    "/org": () => new Response("SPXPERT Solutions OPC!"),
  },
});

console.log(`Listening on ${server.url}`);
