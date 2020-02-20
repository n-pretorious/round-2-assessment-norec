import { Module } from '@nestjs/common'

import { UserService } from './service/user.service'

import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from '../models/user.scheema'

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
