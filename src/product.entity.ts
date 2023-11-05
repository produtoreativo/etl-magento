import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'catalog_product_entity' })
export class Product {
  @PrimaryGeneratedColumn()
  entity_id: number;

  @Column()
  attribute_set_id: number;

  @Column()
  sku: string;
}
