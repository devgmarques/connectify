# Documentação do Connectify - Back-end

## Sumário
1. [Introdução](#1-introdução)
2. [Arquitetura do Projeto](#2-arquitetura-do-projeto)
   - [Princípios Seguidos](#21-princípios-seguidos)
3. [Tecnologias Utilizadas](#3-tecnologias-utilizadas)
4. [Design do Código](#4-design-do-código)
   - [Use Cases](#41-use-cases)
   - [Testes Unitários](#42-testes-unitários)
5. [Como Executar o Projeto](#5-como-executar-o-projeto)
   - [Pré-requisitos](#51-pré-requisitos)
   - [Instalação](#52-instalação)
   - [Execução de Testes](#53-execução-de-testes)
6. [Rotas da API](#6-rotas-da-api)
7. [Considerações Finais](#7-considerações-finais)

## 1. **Introdução**
Este projeto foi desenvolvido como aprendizado como desenvolvedor backend. A seguir, detalho as decisões técnicas, tecnologias utilizadas e o processo de desenvolvimento, destacando como as práticas de engenharia de software e padrões arquiteturais foram seguidos.

## 2. **Arquitetura do Projeto**
A estrutura do projeto segue a **Clean Architecture**, separando claramente as camadas de domínio, aplicação, infraestrutura e interfaces externas.

### 2.1 **Princípios Seguidos**
- **SOLID**: Aplicamos os cinco princípios para garantir a escalabilidade e manutenção do código.
- **KISS**: Mantivemos o código simples e fácil de entender.
- **DRY**: Evitamos repetição de lógica e código.
- **Clean Code**: Foco em legibilidade e simplicidade de compreensão.

## 3. **Tecnologias Utilizadas**
O projeto back-end foi desenvolvido utilizando as seguintes tecnologias:
- **Node.js**: Ambiente de execução JavaScript para o back-end.
- **TypeScript**: Adotamos TypeScript para garantir tipagem estática e maior segurança durante o desenvolvimento.
- **Prisma**: Usado para a manipulação de banco de dados e mapeamento objeto-relacional (ORM).
- **PostgreSQL**: Banco de dados relacional utilizado no projeto.
- **Vitest**: Framework de testes utilizado para testes unitários.
- **Fastify**: Framework para criar a API RESTful.
- **Docker**: Utilizado para facilitar o setup do ambiente.

## 4. **Design do Código**
### 4.1 **Use Cases**
Implementamos os **casos de uso** seguindo os princípios da Clean Architecture. Os casos de uso são independentes de detalhes de infraestrutura, facilitando o teste e a manutenção. Cada caso de uso é testado com **testes unitários**, onde utilizamos **repositórios em memória** para simular interações com o banco de dados.

### 4.2 **Testes Unitários**
- Os testes unitários foram implementados utilizando **Vitest**. O padrão de testes **spy** foi usado para monitorar interações e garantir o funcionamento correto dos casos de uso.
- Os repositórios em memória permitiram que os testes fossem executados de forma independente do banco de dados, aumentando a velocidade e confiabilidade dos testes.

## 5. **Como Executar o Projeto**

### 5.1 **Pré-requisitos**
Certifique-se de ter instalado:
- Docker
- Node.js

Para a seção de **Instalação**, você já tem uma boa estrutura. Aqui está uma sugestão com ajustes para melhorar a clareza e fluxo:

---

### 5.2 **Instalação**

1. Clone o repositório:
   ```bash
   git clone https://github.com/devgmarques/connectfy.git
   cd connectfy
   ```

2. Abra a pasta do backend:
   ```bash
   cd connectify-api
   ```

3. Instale as dependências do projeto:
   ```bash
   npm install
   ```

4. Configure o arquivo de ambiente:
   - Crie um arquivo `.env` com base no `.env.example` e preencha os valores necessários, como a URL do banco de dados e outras variáveis de configuração, variáveis do Supabase não irão ser disponibilizadas.

5. Suba o banco de dados PostgreSQL utilizando Docker:
   ```bash
   docker-compose up -d
   ```

6. Inicie a aplicação:
   ```bash
   npm run start
   ```

### 5.3 **Execução de Testes**
Para rodar os testes unitários:
```bash
npm run test
```

## 6. **Rotas da API**

A aplicação foi construída utilizando **Fastify** para gerenciar as rotas da API. Todas as rotas seguem o padrão RESTful, com endpoints organizados por recursos. Todas as rotas estão disponíveis em: https://documenter.getpostman.com/view/33097794/2sA3XV8ent.

## 7. **Considerações Finais**
O projeto foi desenvolvido seguindo os bons padrões de arquitetura e design de código, garantindo escalabilidade, facilidade de manutenção e testes robustos. Todas as decisões foram tomadas visando uma aplicação de alta qualidade, seguindo fielmente os requisitos propostos.

Desenvolvido por Guilherme Henrique Marques.