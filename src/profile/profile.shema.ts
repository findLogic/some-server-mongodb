import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { User } from 'src/user/user.schema';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile extends Document {
    @Prop()
    firstname?: string;

    @Prop()
    lastname?: string;

    @Prop()
    city?: string;

    @Prop()
    about?: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
