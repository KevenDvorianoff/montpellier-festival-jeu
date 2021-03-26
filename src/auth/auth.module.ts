import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PasswordService } from 'src/user/password.service';
import { databaseAccessModule } from 'src/utils';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        signOptions: { expiresIn: '60s' },
        secret: config.get('JWT_SECRET')
      })
    }),
    databaseAccessModule()
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    PasswordService
  ],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
