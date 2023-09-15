import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import mongoose, { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Document {
    @Prop({ required: true, unique: true })
    login: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    prop: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
    })
    profile: mongoose.Schema.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashed = await bcrypt.hash(this['password'], 10);
        this['password'] = hashed;
        return next();
    } catch (err) {
        return next(err);
    }
});
