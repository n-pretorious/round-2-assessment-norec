import { Injectable, HttpException, HttpStatus } from '@nestjs/common'

import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'

import { User } from '../../interface/user.interface'
import { LoginUserDto } from '../../auth/dto/loginUser.dto'
import { RegisterUserDto } from '../../auth/dto/registerUser.dto'

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) {}

    private sanitizeUser(user: User) {
        const sanitized = user.toObject()
        delete sanitized['password']
        return sanitized;
      }

    async findAll(user: User): Promise<User[]> {
        return this.userModel.find(user)
    }

    async findOne(user: User): Promise<User> {
        return this.userModel.findById(user)
    }

    // create a new
    async create(registerUserDto: RegisterUserDto) {
       const { email } = registerUserDto

       const user = await this.userModel.findOne({ email })

       //check if a user already exists
       if(user) {
           throw new HttpException(
               'user already exists',
               HttpStatus.BAD_REQUEST
            )
       }

       const newUser = new this.userModel(registerUserDto)

       await newUser.save()

       return this.sanitizeUser(newUser)
    }

    async findByLogin(loginUserDto: LoginUserDto) {
        const { email, password } = loginUserDto

        const user = await this.userModel.findOne({ email })

        //check if a user does not exist
        if (!user) {
            throw new HttpException(
                'invalid credentials',
                HttpStatus.UNAUTHORIZED
            )
        }

        if(await bcrypt.compare(password, user.password)) {
            return this.sanitizeUser(user)
        } else {
            throw new HttpException(
                'invalid credentials',
                HttpStatus.UNAUTHORIZED
            )
        }
    }

    async findByPayload(payload: any) {
        const { email } = payload
        return await this.userModel.findOne({ email })
    }

}
