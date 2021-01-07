# Rotas de viagem com menor custo

## Execução

Antes de executar a aplicação, é preciso instalar as dependências. Com um terminal aberto na pasta raíz do projeto, basta fazer:

```shell
npm install
```

Agora, podemos colocar o servidor web no ar, que poderá ser acessado via `http://localhost:3000`. Além disso, a interface de console também estará disponível, conforme descrita na seção anterior. Para isso, basta executar:

```shell
npm start
```

Para executar os testes unitários escritos, faça:

```shell
npm test
```

## Estrutura dos arquivos/pacotes

As funcionalidades da aplicação são definidas na pasta `features`, em que são inseridas subpastas, cada uma com o nome da funcionalidade. Cada uma dessas pastas segue um mesmo padrão:

* Definimos as rotas HTTP que interagem com seus recursos em `routes.js`.
* Definimos os controladores (recebem uma **requisição** e retornam uma **resposta**) de cada rota dentro de `commands`.
* `repository.js` guarda módulos encarregados de lógicas granulares que são chamadas pelos controladores.


Em `routes/index.js`, é definido o roteador que recebe as rotas HTTP definidas em `features/<feature-name>/routes.js`. O arquivo `index.js` recebe esse roteador e realiza outras configuraçes do app web que serão passadas para `config/server.js`, que coloca nosso servidor web para funcionar. A interface de console é definida em `config/console.js`. 

O arquivo `input-routes.csv` é mantido na raíz do projeto. Testes unitários podem ser encontrados em `test/test.js`.

## Decisões de design adotadas para a solução

Para representar as rotas de viagem, é utilizado um grafo em que seus nós/vértices constituem os pontos de partida e chegada e suas arestas mapeiam o custo entre dois pontos. Uma tradicional busca em profundidade nos dá os caminhos possíveis entre dois vértices A e B.

Após um certo nó ser explorado, na hora de realizar o *backtracking*, selecionamos apenas o caminho que contabilizou o menor custo ao invés de retornarmos todos os caminhos encontrados. Dessa forma, aproveitamos a descoberta de caminhos possíveis e contabilizamos a solução ótima ao longo do processo. Ao final da busca, obtemos a rota de viagem geral de menor custo.

## API Rest

### Consultar rota
----
  Consulta de melhor rota entre dois pontos.

* **URL**

  `/queries/traces`

* **Método:**

  `GET`
  
*  **Parâmetros URL** 

   **Obrigatório:**
 
   `origin=[string]`
   `destiny=[string]`

* **Resposta de sucesso:**

  * **Código:** 200 SUCCESS <br />
    **Conteúdo:** `GRU-BRC-SCL-ORL-CDG`
 
* **Resposta de erro:**

  * **Código:** 400 BAD REQUEST <br />
    **Conteúdo:** `'origin' is required` `'destiny' is required`

  OU

  * **Código:** 500 INTERNAL SERVER ERROR <br />
    **Conteúdo:** `Empty`

* **Exemplo de chamada:**

```shell
$ curl -X GET "http://localhost:3000/queries/traces?origin=GRU&destiny=CDG"
GRU-BRC-SCL-ORL-CDG
```

### Criar rota
----
  Insere uma nova rota no arquivo `input-routes.csv`.

* **URL**

  `/traces`

* **Método:**

  `POST`
  
*  **Parâmetros URL** 

   Nenhum parâmetro.
   
*  **Parâmetros de dados (corpo)** 

   `origin=[string]`
   `destiny=[string]`
   `cost=[number]`

* **Resposta de sucesso:**

  * **Código:** 201 CREATED <br />
    **Conteúdo:** `Created`
 
* **Resposta de erro:**


  * **Código:** 500 INTERNAL SERVER ERROR <br />
    **Conteúdo:** `Empty`

* **Exemplo de chamada:**

```shell
$ curl -X POST -d "origin=BRC&destiny=FRA&cost=42" "http://localhost:3000/traces"
Created
```
