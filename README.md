<!-- ABOUT THE PROJECT -->
## Sobre o Projeto

Lib do contexto de desenvolvimento

### Construído Com

<!-- More badges on https://github.com/alexandresanlim/Badges4-README.md-Profile -->
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## Primeiros Passos

Este documento explica como importar e publicar uma nova versão do projeto

### Pré-requisitos

Antes de executar este projeto, verifique se você possui essas dependências instaladas:

* NodeJS versão 18 ou superior [NodeJS](https://nodejs.org/en)
* Docker [Docker Desktop](https://docs.docker.com/desktop/)

### Variáveis de Ambiente
Essas variáveis devem ser definidas para executar a lib em outros projetos

```ts
    LIB_DEVELOPMENT_POSTGRES_USER=""                        #Usuário para a conexão com o banco de dados postgres
    LIB_DEVELOPMENT_POSTGRES_PASSWORD=""                    #Senha para a conexão com o banco de dados postgres
    LIB_DEVELOPMENT_POSTGRES_PORT=""                        #Porta para a conexão com o banco de dados postgres
    LIB_DEVELOPMENT_POSTGRES_HOST=""                        #Host para a conexão com o banco de dados postgres
    LIB_DEVELOPMENT_POSTGRES_SSL=""                         #Se estiver igual a true, a conexão é iniciada com SSL

    LIB_DEVELOPMENT_REDIS_URL=""                            #Url para a conexão com o redis
    LIB_DEVELOPMENT_REDIS_SSL=""                            #Se estiver igual a true, a conexão é iniciada com SSL

    LIB_DEVELOPMENT_CASSANDRA_CONTACT_POINT=""              #Host para a conexão com o cassandra
    LIB_DEVELOPMENT_CASSANDRA_KEYSPACE=""                   #Keyspace para a conexão com a cassandra
    LIB_DEVELOPMENT_CASSANDRA_LOCAL_DATA_CENTER=""          #Datacenter para a conexão com a cassandra
```

### Instalação

_Siga esses passos para publicar uma nova versão da lib_

1. Clone o repositório
   ```sh
    git clone git@bitbucket.org:versatushpc/domain-development.git
   ```
2. Incremente a versão da lib no arquivo package.json

3. Envie o código para o repositório remoto

4. Crie um PR de staging para master

5. Aprove o PR

6. A pipelipe de publicação irá enviar o projeto ao NPM
