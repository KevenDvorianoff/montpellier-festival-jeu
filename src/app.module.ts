import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { GameModule } from './game/game.module';
import { ReservationModule } from './reservation/reservation.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ReservedGameModule } from './reserved-game/reserved-game.module';


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
    ReservationModule,
    InvoiceModule,
    ReservedGameModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
