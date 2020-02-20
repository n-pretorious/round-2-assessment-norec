import { Module } from '@nestjs/common';

import { UserModule } from 'src/user/user.module'
import { AuthController } from './controller/auth.controller'
import { AuthService } from './service/auth.service'

import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
