import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Users {
  @Prop()
  userName: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(Users);
