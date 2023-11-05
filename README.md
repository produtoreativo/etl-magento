Inserir na tabela catalog_product_entity considerando que existe um ID independente, uma coluna sku que é relacionada com o field MATNR e o valor fixo 4 na coluna attribute_set_id.

Inserir na tabela catalog_product_website que tem apenas duas colunas, product_id que é relacionada com o id da tabela catalog_product_entity e website_id que é valor fixo 1.

Inserir na tabela catalog_product_entity_varchar o field MAKTX do stream inicial na coluna value, o valor fixo de 73 na coluna attribute_id e o valor do id da tabela catalog_product_entity na coluna entity_id


curl -X DELETE http://localhost:8081/subjects

curl -X DELETE http://localhost:8081/subjects/solar.DB_API_Solar.dbo.T_PRODUTOS-value
