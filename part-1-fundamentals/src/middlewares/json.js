export async function json(request, response) {
  try {
    const buffers = [];

    for await (const chunk of request) {
      buffers.push(chunk);
    }
    request.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    request.body = null;
  }
  // Agora toda requisição retorna um JSON
  response.setHeader("Content-type", "application/json");
}
