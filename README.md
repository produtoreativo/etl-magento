## Pré-condições

[Material da aula sobre o Search API](https://github.com/produtoreativo/search-api/tree/1.0.0/infra)  
Banco de origem com CDC ativado em uma tabela de produtos  
Ambiente Kafka configurado com Debezium buscando os dados e criando um topico para a tabela de produtos  


## Executar o start
Executar passando o env  
* Dever de casa implementar um override no decorator para pegar o env do ConfigService, dado que não carrega na assinatura do decorator MessagePattern, encontramos [essa gambi lindona](https://github.com/nestjs/nest/issues/3912)

```sh
KAFKA_TOPIC_METADATA=topico_produtos npm run start:dev
```

## Configuração do Magento

Este microserviço considera que o Magento está desabilitado para processar estoque e preço.  
Portanto, precisamos criar e alterar em apenas 3 tabelas:  
1.  catalog_product_entity: Tabela que representa o produto no Magento;
2.  catalog_product_website: Tabela que liga o produto ao conceito de loja que o Magento utiliza, no nosso caso só existe uma loja;
3.  catalog_product_entity_varchar: Tabela que guarda o nome do produto, dado o modelo de metadados que o Magento utiliza.

Caso precise processar preço e estoque, seria necessário atualizar as seguintes tabelas:  
1.  catalog_product_entity_int: Pelo menos 3 entradas nessa tabela no modelo de metaprogramação (verificar no banco como funciona)
2.  catalog_product_entity_decimal: Tabela que guarda o preço
3.  cataloginventory_stock_item: Tabela que guarda o item de estoque para o produto

## Excluir schemas no Schema-registry
curl -X DELETE http://localhost:8081/subjects/[SCHEMA]

