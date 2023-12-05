import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Users {
  userName: string;
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(Users);
