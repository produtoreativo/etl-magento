import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

async function bootstrap() {
  console.log('Env', process.env.KAFKA_BROKERS);
  console.log('Product table', process.env.KAFKA_TOPIC_METADATA);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'etl-magento',
          brokers: [process.env.KAFKA_BROKERS],
        },
        consumer: {
          groupId: 'etl-magento',
        },
        run: {
          autoCommit: true,
        },
        subscribe: {
          fromBeginning: true,
        },
      },
    },
  );
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.enableShutdownHooks();
  await app.listen();
}
bootstrap();
