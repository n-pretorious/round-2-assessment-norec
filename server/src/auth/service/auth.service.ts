import { Injectable } from '@nestjs/common'

import { UserService } from '../../user/service/user.service'

import { sign } from 'jsonwebtoken'

import { Payload } from '../../interface/payload.interface'

import config from '../../config/keys'

@Injectable()
export class AuthService {
    constructor (private userService: UserService) {}

    signPayload(payload: Payload) {
        return sign(payload, config.JWT_secret_key, {expiresIn: '24h'})
    }

    async validateUser(payload: Payload) {
        return await this.userService.findByPayload(payload)
    }
}
