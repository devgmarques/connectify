## App

Connectify - A rede social 

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível editar o perfil de um usuário logado;
- [x] Deve ser possível seguir e deixar de seguir usuários;
- [x] Deve ser possível visualizar postagens no feed de notícias;
- [x] Deve ser possível criar postagens com texto;
- [x] Deve ser possível curtir e comentar em postagens;
- [x] Deve ser possível buscar usuários e postagens;
- [] Deve ser possível visualizar o histórico de mensagens diretas;
- [] Deve ser possível enviar mensagens diretas para outros usuários;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [] O usuário pode ajustar as configurações de privacidade para seu perfil e postagens;
- [] As postagens no feed de notícias devem ser ordenadas cronologicamente ou por relevância;
- [] O usuário deve poder desativar ou excluir sua conta.
- [] O usuário só pode enviar mensagens diretas para seguidores;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [] O usuário deve ser identificado por um JWT (JSON Web Token);
- [] A aplicação deve garantir conformidade com regulamentações de proteção de dados (ex. GDPR, CCPA);
- [] A aplicação deve ter monitoramento e logs de erros para manutenção e otimização contínua.
