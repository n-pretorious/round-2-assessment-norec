import { Module } from '@nestjs/common'

import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'

import { MongooseModule } from '@nestjs/mongoose'

import config from './config/keys'

@Module({
  imports: [
    MongooseModule.forRoot(
      config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    ),
    UserModule,
    AuthModule
  ],
})
export class AppModule {}
