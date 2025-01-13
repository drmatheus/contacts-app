# ContactHub

Este é um projeto React criado com [Create React App](https://github.com/facebook/create-react-app).

A ideia do projeto é oferecer uma forma simples de salvar contatos e seus respectivos endereços, permitindo também visualizar os endereços no Google Maps.

## Como rodar o projeto

1. Certifique-se de ter o Node.js instalado.
2. Instale as dependências do projeto:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env` na raiz do projeto com a seguinte variável de ambiente:

   ```
   REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
   ```

   Substitua `YOUR_GOOGLE_MAPS_API_KEY` pela sua chave da API do Google Maps.

4. Para testar a API, ative o serviço CORS Anywhere:

   - Acesse [https://cors-anywhere.herokuapp.com/corsdemo](https://cors-anywhere.herokuapp.com/corsdemo) e clique no botão "Request temporary access to the demo server".

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

O aplicativo estará disponível em [http://localhost:3000](http://localhost:3000).

## Scripts disponíveis

- `npm start`: Inicia o servidor de desenvolvimento.

## Requisitos

- Chave da API do Google Maps.
- Acesso ativado ao CORS Anywhere para testes.
