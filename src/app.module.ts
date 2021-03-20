import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { GameModule } from './game/game.module';
import { FestivalModule } from './festival/festival.module';
import { PriceModule } from './price/price.module';
import { AreaModule } from './area/area.module';
import { ReservedTableModule } from './reserved-table/reserved-table.module';


@Module({
  imports: [
    ConfigModule.forRoot(), 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        url: config.get('DATABASE_URL'),
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: config.get('NODE_ENV') !== 'production',
      }),
    }),
    AccountModule,
    GameModule,
    FestivalModule,
    PriceModule,
    AreaModule,
    ReservedTableModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
