## App

Connectify - A rede social

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [] Deve ser possível se autenticar;
- [] Deve ser possível obter o perfil de um usuário logado;
- [] Deve ser possível editar o perfil de um usuário logado;
- [] Deve ser possível seguir e deixar de seguir usuários;
- [] Deve ser possível visualizar postagens no feed de notícias;
- [] Deve ser possível criar postagens com texto;
- [] Deve ser possível curtir e comentar em postagens;
- [] Deve ser possível enviar mensagens diretas para outros usuários;
- [] Deve ser possível buscar usuários e postagens;
- [] Deve ser possível visualizar o histórico de mensagens diretas;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [] O usuário pode ajustar as configurações de privacidade para seu perfil e postagens;
- [] O usuário só pode enviar mensagens diretas para seguidores;
- [] Administradores podem remover postagens ou comentários que violem os termos de serviço;
- [] Administradores podem suspender ou banir usuários que violarem repetidamente as regras da comunidade;
- [] Notificações de interações devem ser enviadas em tempo real;
- [] As postagens no feed de notícias devem ser ordenadas cronologicamente ou por relevância;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [] O usuário deve ser identificado por um JWT (JSON Web Token);
- [] A aplicação deve suportar um alto volume de usuários e interações simultâneas;
- [] A aplicação deve garantir conformidade com regulamentações de proteção de dados (ex. GDPR, CCPA);
- [] A aplicação deve ter monitoramento e logs de erros para manutenção e otimização contínua.
