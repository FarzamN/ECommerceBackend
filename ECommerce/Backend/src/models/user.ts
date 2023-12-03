import { Schema, model } from 'mongoose'

export interface IUser {
    id: 0;
    username: string;
    password: string;
    availableMonet: number
}

const userSchema = new Schema<IUser>({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true, unique: true },
    availableMonet: { type: Number, default: 100 },
})

export const userModule = model<IUser>('User', userSchema)