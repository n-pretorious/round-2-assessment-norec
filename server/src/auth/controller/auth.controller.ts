import { Controller, 
    Get, 
    UseGuards, 
    Post, 
    Body, 
    Param
} from '@nestjs/common'

import { UserService } from '../../user/service/user.service'

import { AuthGuard } from '@nestjs/passport'

import { RegisterUserDto } from '../dto/registerUser.dto'
import { LoginUserDto } from '../dto/loginUser.dto'
import { AuthService } from '../service/auth.service'

import { Payload } from '../../interface/payload.interface'

import { UserDecorator } from '../../user/utilities/user.decorator'
import { User } from '../../interface/user.interface'

@Controller('auth')
export class AuthController {
    constructor (
        private userService: UserService,
        private authService: AuthService,
    ) {}

    @Get('protected')
    @UseGuards(AuthGuard('jwt'))
    async findOne(@UserDecorator() user: User) {
        return await this.userService.findOne(user)
    }

    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto) {
        const user =  await this.userService.create(registerUserDto)
        const userId = user._id

        return userId
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        
        const user = await this.userService.findByLogin(loginUserDto)
        console.log({ user })

        const payload: Payload = {
            email: user.email,
            id: user._id
        }

        const token = this.authService.signPayload(payload)

        return {
            jwt: token
        }
      }

}
