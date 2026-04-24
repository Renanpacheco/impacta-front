# Projeto Tarefas (Full Stack)

Aplicação completa para gerenciamento de tarefas.

## Tecnologias

-   Backend: .NET (ASP.NET Core + Entity Framework)
-   Frontend: Angular
-   Banco de Dados: SQL Server (Docker)


## ⚙️ Pré-requisitos

Antes de iniciar, instale:

-   Node.js (versão 20.19+)\
    https://nodejs.org/pt-br/download

-   Angular CLI\

    npm install -g @angular/cli

-   .NET SDK\
    https://dotnet.microsoft.com/en-us/download

-   Docker\
    https://docs.docker.com/



## Executando o projeto

>  Execute os passos **na ordem**



## 🗄️ 1. Subir o banco de dados (SQL Server)

    docker run -e "ACCEPT_EULA=Y" \
               -e "SA_PASSWORD=SenhaForte123!" \
               -p 1433:1433 \
               --name sqlserver \
               -d mcr.microsoft.com/mssql/server:2022-latest

Aguarde alguns segundos até o banco iniciar.

## 🔧 2. Backend (.NET)

### Clonar repositório

    git clone https://github.com/Renanpacheco/impacta-back
    cd impacta-back

### Restaurar dependências

    dotnet restore

### Aplicar migrations

    dotnet ef database update

### Rodar API

    dotnet run

### Opcional para rodar a api com interface gráfica
    
    dotnet watch

A API estará disponível em:

http://localhost:5104



## 3. Frontend (Angular)

### Clonar repositório

    git clone https://github.com/Renanpacheco/impacta-front
    cd impacta-front

### Instalar dependências

    npm install

### Rodar aplicação

    ng serve --open

A aplicação estará disponível em:

http://localhost:4200



## 🔗 Integração

O frontend consome a API via:

http://localhost:5104/api/TarefaApi



## Problemas comuns

### Erro de conexão com banco

Verifique se o container está rodando:

    docker ps

Se necessário:

    docker start sqlserver



### API não conecta no Angular

Verifique se:

-   A API está rodando
-   A URL está correta (`/api/TarefaApi`)
-   CORS está habilitado



## Observações

-   O banco é criado automaticamente via migrations
-   O container pode ser reiniciado com:


    docker start sqlserver


## Autor

Renan Pacheco