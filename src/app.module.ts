import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { ReservationModule } from './reservation/reservation.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ReservedGameModule } from './reserved-game/reserved-game.module';

import { FestivalModule } from './festival/festival.module';
import { PriceModule } from './price/price.module';
import { AreaModule } from './area/area.module';
import { ReservedTableModule } from './reserved-table/reserved-table.module';
import { CompanyModule } from './company/company.module';
import { ContactModule } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';

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
    UserModule,
    GameModule,
    ReservationModule,
    InvoiceModule,
    ReservedGameModule,
    FestivalModule,
    PriceModule,
    AreaModule,
    ReservedTableModule,
    CompanyModule,
    ContactModule,
    AuthModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
