import { Document } from 'mongoose'

export interface User extends Document {
    firstName: string
    familyName: string
    email: string
    readonly password: string
}