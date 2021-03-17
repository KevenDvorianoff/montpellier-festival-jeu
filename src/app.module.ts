import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';


@Module({
  imports: [AccountModule, ConfigModule.forRoot(), TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      url: config.get('DATABASE_URL'),
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: config.get('NODE_ENV') !== 'production',
    }),
  })],
  controllers: [],
  providers: [],
})
export class AppModule { }
