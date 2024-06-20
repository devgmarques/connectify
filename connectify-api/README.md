## App

Connectify - A rede social 

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível editar o perfil de um usuário logado;
- [x] Deve ser possível seguir e deixar de seguir usuários;
- [x] Deve ser possível visualizar postagens no feed de notícias;
- [x] Deve ser possível criar postagens com texto;
- [x] Deve ser possível curtir e comentar em postagens;
- [x] Deve ser possível buscar usuários e postagens;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] As postagens no feed de notícias devem ser ordenadas cronologicamente;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);

## Documentação da API

A documentação completa da Connectify API está disponível em https://documenter.getpostman.com/view/33097794/2sA3XV8ent.