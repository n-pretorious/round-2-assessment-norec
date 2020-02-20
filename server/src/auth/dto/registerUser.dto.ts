import { 
  IsEmail, 
  IsNotEmpty 
} from "class-validator"

export class RegisterUserDto {
  id?: string
  firstName: string
  familyName: string

  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string
}
