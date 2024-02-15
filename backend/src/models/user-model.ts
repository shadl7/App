import {Schema, model, Types} from 'mongoose';

const UserSchema = new Schema<IUser>({
   email: {type: String, unique: true, required: true},
   password: {type: String, required: true},
   isActivated: {type: Boolean, default: false},
   activationLink: {type: String},
   scripts: {type: [Types.ObjectId], ref: 'Script', required: true},
   collections: {type: [Types.ObjectId], ref: 'Collection', required: true}
})
export const UserModel = model<IUser>('User', UserSchema);
export interface IUser {
   _id: Types.ObjectId;
   email: string;
   password: string;
   isActivated: boolean;
   activationLink: string;
   scripts: [Types.ObjectId];
   collections: [Types.ObjectId];
}