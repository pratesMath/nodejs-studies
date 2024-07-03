# criação do projeto
npm init -y
# instalando ts como dependência de desenvolvimento
npm i -d typescript
# inicializando o ts
npx tsc --init
# comando para compilar código ts em js
npx tsc src/server.ts
# instalando fastify
npm i fastify
# instalando tipagens do node.js (node não atua nativamente com ts)
npm i -d @types/node
# instalando tsx (jamais use em ambiente de produção)
npm i -d tsx
# instalando eslint e configuração do eslint pela rockeseat
# como dependência de desenvolvimento
npm i -d eslint @rocketseat/eslint-config
# instalando knex.js + driver do banco de dados sqlite
npm i knex sqlite3
# criando 1° migration
npm run dev:knex -- migrate:make create-transactions
# criando 1° tabela (com base na migration)
npm run dev:knex -- migrate:latest
# desfazendo migration
npm run dev:knex -- migrate:rollback
# criando migration para alterar uma tabela já criada em outra migration
npm run dev:knex -- migrate:make add-session-id-to-transactions
# atualizando migration (e a tabela)
npm run dev:knex -- migrate:latest
# instalando dotenv
npm i dotenv
# instalando zod
npm i zod
# instalando plugin de cookie do fastify
npm i @fastify/cookie
# instalando vitest como dependência de desenvolvimento
npm i vitest -D
# executando o primeiro teste com vitest
npm run dev:test
# instalando o supertest como dependência de desenvolvimento
npm i supertest @types/supertest -D
# instalando o tsup como dependência de desenvolvimento
npm i tsup -D
# executar script de build
npm run build
# instalando driver nativo do postgres para ambiente de produção (no Render)
npm i pg