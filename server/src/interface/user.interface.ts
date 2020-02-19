import { Document } from 'mongoose'

export interface User extends Document {
    id?: string,
    fistName: string,
    familyName: string,
    email: string,
    readonly password: string 
}