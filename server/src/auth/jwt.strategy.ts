import { Injectable, HttpException, HttpStatus, Next } from '@nestjs/common'

import { PassportStrategy } from '@nestjs/passport'
import { 
    Strategy, 
    ExtractJwt, 
    VerifiedCallback 
} from 'passport-jwt'

import config from '../config/keys'

import { AuthService } from './service/auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: config.JWT_secret_key,
        })
      }

      async validate(payload: any, done: VerifiedCallback) {
          const user = await this.authService.validateUser(payload)

        try {
            if (!user) {
                return done(
                    new HttpException(
                        'unauthorised access',
                        HttpStatus.UNAUTHORIZED,
                    ), false
                )
            }
        } catch (err) {
            return err
        }

        return done(null, user, payload.iat)
      }
}