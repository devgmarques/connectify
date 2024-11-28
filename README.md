<p align="center">
  <img alt="Connectify" src="./public/icon.png" width="180px" />
</p>

<p align="center">
  <img src="https://img.shields.io/static/v1?label=Connectify&message=Network&color=121418&labelColor=202024" alt="Connectify" />
  <a href="LICENSE">
    <img  src="https://img.shields.io/static/v1?label=License&message=MIT&color=121418&labelColor=202024" alt="License">
  </a>
</p>

## 🚀 Introdução

**Connectify** é uma rede social que permite aos usuários se conectar, compartilhar postagens, curtir, comentar e seguir amigos. Desenvolvido com tecnologias modernas, o projeto inclui um front-end responsivo e uma API eficiente para oferecer uma experiência fluida.

## 🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido com as seguintes tecnologias:

### Front-end
- **Next.js:** Framework React para aplicações web.
- **React.js:** Biblioteca para interfaces de usuário.
- **Axios:** Cliente HTTP para comunicação com a API.
- **Tailwind CSS:** Framework CSS utilitário.
- **Shadcn/UI:** Biblioteca de componentes UI moderna e acessível.
- **React Icons:** Biblioteca de ícones para React.
- **TypeScript:** Linguagem que adiciona tipagem estática ao JavaScript.

### Back-end
- **Fastify:** Framework web para Node.js.
- **Prisma:** ORM para manipulação de banco de dados.
- **PostgreSQL:** Banco de dados relacional.
- **TypeScript:** Linguagem que adiciona tipagem estática ao JavaScript.

## 🔧 Requisitos

- Você precisa instalar o [Node.js](https://nodejs.org/en/download/) para rodar esse projeto.

## 🛠️ Configuração do Projeto

### Clonar o projeto

```bash
$ git clone https://github.com/devgmarques/connectify && cd connectify
```

Configuração do Front-end
```bash
bash
Copy code
$ cd connectify-web
# Instalar as dependências
$ npm i
# Rodar o projeto
$ npm run dev
O aplicativo estará disponível para acesso no navegador em http://localhost:3000.
```

Configuração do Back-end
```bash
$ cd connectify-api
# Instalar as dependências
$ npm i
# Configurar o banco de dados
$ npx prisma migrate dev
# Rodar o projeto
$ npm run dev
```

Desenvolvido por Guilherme Henrique Marques.