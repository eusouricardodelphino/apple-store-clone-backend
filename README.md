# Apple Store Clone Backend

Este é um aplicativo de exemplo feito para um teste de uma vaga de emprego.

Eu construi uma API com um CRUD simples de uma lista de produtos para servir um front end que pode ser encontrado:

[https://github.com/ridelphino/apple-store-clone-frontend](https://github.com/ridelphino/apple-store-clone-frontend)].

## Tecnologias e Dependências.

Aqui vou descrever um pouco das tecnologias que usei e das dependências necessárias para rodar o projeto.

- Node JS v14.8.1
- Yarn v1.22.17
- Linguagem: Typescript v4.5.4
- Database: SQLite3 v3.36.0
- ORM: TypeORM v0.2.41
- Express v4.17.2

Da lista acima, é necessário instalar apenas o SQLite, o Node e, caso você queira, o Yarn mas esse último não é necessário.
Tenha a certeza de ter todas as dependências instaladas.

Faça o clone do projeto para o ambiente local e rode o comando `yarn` ou `npm install`, dependendo do seu gerenciador de dependências.

Para rodar o projeto, use os comandos:
- `yarn` - Esse comando instala as dependências do projeto.
- `yarn typeorm migration:run` - Esse comando constrói a base de dados no seu
  local.
- `yarn dev:server` - Esse comando executa o projeto na porta 3333.
