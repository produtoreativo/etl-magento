## Pré-condições

[Material da aula sobre o Search API](https://github.com/produtoreativo/search-api/tree/1.0.0/infra)
Banco de origem com CDC ativado em uma tabela de produtos  
Ambiente Kafka configurado com Debezium buscando os dados e criando um topico para a tabela de produtos


## Executar o start
Executar passando o env [dever de casa implementar um override no decorator para pegar o env do ConfigService]

```sh
KAFKA_TOPIC_METADATA=topico_produtos npm run start:dev
```


## Excluir schemas no Schema-registry
curl -X DELETE http://localhost:8081/subjects/[SCHEMA]

