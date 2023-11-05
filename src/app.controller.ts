import { Logger, Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}
  private readonly logger = new Logger(AppController.name);
  private readonly registry = new SchemaRegistry({
    host: this.configService.get<string>('SCHEMA_REGISTRY'),
  });

  @MessagePattern(process.env.KAFKA_TOPIC_METADATA)
  async updateProduct(@Payload() message: any, @Ctx() context: KafkaContext) {
    this.logger.log(`Topic: ${context.getTopic()}`);
    this.logger.log(`Partition: ${context.getPartition()}`);
    this.logger.log(`Offset: ${context.getMessage().offset}`);

    const originalMessage = context.getMessage();
    if (originalMessage.value) {
      const decoded = await this.registry.decode(message);
      const sku = decoded[this.configService.get<string>('SKU_NAME')];
      const productName =
        decoded[this.configService.get<string>('PRODUCT_NAME')];
      this.logger.log(decoded);
      await this.appService.verifyProduct(sku, productName);
    }
  }
}
