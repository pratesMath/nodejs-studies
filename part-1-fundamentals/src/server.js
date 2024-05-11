import crypto from "node:crypto";
import http from "node:http";

const users = [];

const server = http.createServer((request, response) => {
  const { method, url } = request;

  if (method === "GET" && url === "/users") {
    return response
      .setHeader("Content-type", "application/json")
      .writeHead(200)
      .end(JSON.stringify(users));
  }
  if (method === "POST" && url === "/users") {
    users.push({
      id: crypto.randomUUID(),
      name: "John Doe",
      email: "john.doe@email.com",
    });

    return response.writeHead(201).end("User created successfully");
  }

  return response.writeHead(404).end("Not Found");
});

server.listen(4040);
