import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductWebsite } from './product.website.entity';
import { ProductVarchar } from './product.varchar.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'bn_magento',
      database: 'bitnami_magento',
      entities: [Product, ProductWebsite, ProductVarchar],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Product, ProductWebsite, ProductVarchar]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
