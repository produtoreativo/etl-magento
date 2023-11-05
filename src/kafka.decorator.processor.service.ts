import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class KafkaDecoratorProcessorService {
  constructor(
    // private readonly LOG: Logger,
    private readonly configService: ConfigService,
  ) {}

  processKafkaDecorators(types: any[]) {
    for (const type of types) {
      const propNames = Object.getOwnPropertyNames(type.prototype);
      for (const prop of propNames) {
        const propValue = Reflect.getMetadata(
          this.configService.get<string>('KAFKA_TOPIC_METADATA'),
          Reflect.get(type.prototype, prop),
        );

        if (propValue) {
          const topic = this.configService.get<string>('KAFKA_TOPIC_METADATA');
          // this.LOG.log(`Setting topic ${topic} for ${type.name}#${prop}`);
          Reflect.decorate(
            [MessagePattern(topic)],
            type.prototype,
            prop,
            Reflect.getOwnPropertyDescriptor(type.prototype, prop),
          );
        }
      }
    }
  }
}