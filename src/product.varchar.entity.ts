import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'catalog_product_entity_varchar' })
export class ProductVarchar {
  @PrimaryGeneratedColumn()
  value_id: number;

  @Column()
  attribute_id: number;

  @Column()
  store_id: number;

  @Column()
  entity_id: number;

  @Column()
  value: string;
}
