import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductWebsite } from './product.website.entity';
import { ConfigService } from '@nestjs/config';
import { ProductVarchar } from './product.varchar.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductWebsite)
    private productWebsiteRepository: Repository<ProductWebsite>,
    @InjectRepository(ProductVarchar)
    private productVarcharRepository: Repository<ProductVarchar>,
    private configService: ConfigService,
  ) {}

  private readonly logger = new Logger(AppService.name);

  async verifyProduct(sku: string, productName: string) {
    this.logger.log(`${sku}: ${productName}`);

    try {
      const product = await this.productRepository.findOneBy({ sku });
      if (product?.sku) {
        this.logger.log(`Founded`);
        this.logger.log(product);
        const productVarchar = await this.updateProductName(
          product.entity_id,
          productName,
        );
        this.logger.log(`Varchar Table updated`);
        this.logger.log(productVarchar);
      } else {
        this.logger.log(`NotFound`);
        const newProduct = await this.createProduct(sku);
        this.logger.log(`New Produto ${sku}: ${newProduct.entity_id}`);
        const productWebsite = await this.createProductWebsite(
          newProduct.entity_id,
        );
        this.logger.log(
          `Link with Website ${sku}: ${productWebsite.website_id}`,
        );
        const productVarchar = await this.createProductVarchar(
          productName,
          newProduct.entity_id,
        );
        this.logger.log(
          `Table with product name ${productName}: ${productVarchar.value_id}`,
        );
      }
    } catch (error) {
      this.logger.error(error);
    }
  }

  async updateProductName(
    entity_id: number,
    productName: string,
  ): Promise<ProductVarchar> {
    const productVarchar = await this.productVarcharRepository.findOneBy({
      entity_id,
    });
    this.logger.log(productVarchar);
    productVarchar.value = productName;
    return this.productVarcharRepository.save(productVarchar);
  }

  async createProductVarchar(
    value: string,
    entity_id: number,
  ): Promise<ProductVarchar> {
    return this.productVarcharRepository.save({
      value,
      entity_id,
      attribute_id: this.configService.get<number>('ATTRIBUTE_ID'),
      store_id: this.configService.get<number>('STORE_ID'),
    });
  }

  async createProduct(sku: string): Promise<Product> {
    return this.productRepository.save({
      sku,
      attribute_set_id: this.configService.get<number>('ATTRIBUTE_SET_ID'),
    });
  }

  async createProductWebsite(product_id: number): Promise<ProductWebsite> {
    return this.productWebsiteRepository.save({
      product_id,
      website_id: this.configService.get<number>('WEBSITE_ID'),
    });
  }
}
