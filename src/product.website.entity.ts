import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'catalog_product_website' })
export class ProductWebsite {
  @PrimaryColumn()
  product_id: number;

  @Column()
  website_id: number;
}
