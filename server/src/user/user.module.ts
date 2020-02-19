import { Module } from '@nestjs/common'

import { UserController } from './controller/user/user.controller'
import { UserService } from './service/user/user.service'

import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from '../models/user.scheema'

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
