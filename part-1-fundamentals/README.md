<h1 align="center">Part 1 Fundamentals</h1>

Take a look at `scripts.sh` file!

<h3>1-2# Class</h3>

**NOTES**:

- Não é possível trabalhar com nenhuma API de navegadores web no Node.JS;
- Em um projeto Node.JS, o modo padrão de importação e exportação de arquivos e bibliotecas é conhecido como _CommonJS_, que usa o `require()`;
- e já o segundo (que é mais moderno) é conhecido como _ESModule_, que usa `import/export` ;

```JS
// CommonJS
const http = require("node:http");

// ESModule
import http from "node:http";
```

Para usar o padrão de importação ESModule, adicione o seguinte script ao `package.json` da aplicação:

```JSON
{
  "type": "module" /* "commonjs" // is default mode */
}
```

<h3>3-4# Class</h3>
É possível fazer "live reload" com o Node.JS desde a versão 18.12.

Para isso, basta adicionar a flag `--watch` ao executar o Node.JS.
Para não ficar um processo muito massante de ter que decorar os comandos, podemos adicionar isso a um script interno da aplicação no arquivo `package.json`

```JSON
  "scripts": {
    "dev": "node --watch src/server.js"
  },
```

Agora, basta apenas executar o seguinte comando no terminal:

```SH
  npm run dev
```

<h3>5# Class</h3>
Vamos começar a entender o que são rotas HTTP uma aplicação backend

- Quando desenvolvemos uma API que vai usar o protocolo HTTP e que será consumida por outra aplicação, pode ser um frontend mesmo, nós usamos rotas da nossa aplicação, onde cada rota desempenha um papel específico retornando ao usuário que fez a requisição um recurso (dados, informações) correspondente

Uma requisição HTTP é composta por dois principais componentes:

- Methods;
- URL;

Para isso, adicionamos os métodos HTTP para comunicação entre as aplicações

**Principais métodos do protocolo HTTP**:

- **GET**: para obter um recurso(s) da backend;
- **POST**: para criar um recurso(s) da backend;
- **PUT**: para atualizar um recurso(s) da backend;
- **PATCH**: para atualizar um recurso específico da backend;
- **DELETE**: para deletar um ou mais recursos da backend;

**NOTE**:

- Estes métodos são mais semânticos do que funcionais, ou seja, posso usar qualquer e vai funcionar, mas é contraindicado;
- Nós diferenciamos cada uma das rotas pela soma do método com a url, isso significa que, posso ter duas rotas com a mesma URL mas com métodos divergentes e vice versa;

```HTTP
### Buscando usuários
GET http://localhost:4040/users

### Criando usuários
POST http://localhost:4040/users
```

<h3>6# Class</h3>
Vamos iniciar a estrutura da aplicação

**Stateful VS Stateless**:
A principal diferença entre uma aplicação stateful para uma aplicação stateless, é que:

- A aplicação stateful sempre vai guardar dados em memória durante a execução da aplicação. É muito arriscado e contraintuitivo usar em ambientes de produção;
- Já a aplicação stateless não salva nada em memória, mas sim em infraestruturas externas, como bancos de dados;

**NOTA**:

- Por padrão, no Node.JS não é possível enviar um array como response da requisição, e é aqui onde começamos a trabalhar com JSON (JavaScript Object Notation);
  - **NOTA**: Sobre o JSON, é uma variável global do JS, ou seja, pode ser usada, tanto no frontend quanto no backend;

```JS
if (method === "GET" && url === "/users") {
    return response.end(JSON.stringify(users)); // users é um arra
  }
```

**Cabeçalhos**:
os cabeçalhos de requisição/resposta HTTP nada mais são que metadados em uma requisição, ou seja, se trata da forma como uma requisição serão tratados

- Se refere a forma como um dado pode e deve ser interpretado por uma cliente ou servidor;

```JS
  if (method === "GET" && url === "/users") {
    return response
      .setHeader("Content-type", "application/json")
      .end(JSON.stringify(users));
  }
```

**DICA**: Use `console.log(request.headers)` para obter todos os metadados de uma requisição

<h3>7-8# Class</h3>
Vamos conhecer os HTTP Status Codes

Em um dos conceitos mais importantes na criação de uma API

**What is a Status Code**

- Possuem alta relevância semântica na comunicação entre um client e um server;
- Em resumo, são códigos numéricos enviados na response de uma requisição, ou seja, após no envio da resposta ao client que fez a requisição;
- Podemos encontrar o HTTP Status Code no cabeçalho da requisição de response;

**5 Classes of HTTP Status Code**:

1. Information responses (100 - 199);
2. Successful responses (200 - 299);
3. redirection messages (300 - 399);
4. Client error responses (400 - 499);
5. Server error responses (500 - 599);

Vamos ao exemplo:

```JS
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
```

<h3>9# Class</h3>
Vamos dar uma pausa sobre HTTP e falar sobre `Streams`, finalmente

> O Node.JS é o que é hoje por conta das Streams
