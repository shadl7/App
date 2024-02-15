import {Schema, model, Types} from 'mongoose';

const TokenSchema = new Schema<IToken>({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, required: true},
})

export const TokenModel = model<IToken>('Token', TokenSchema);

export interface IToken {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    refreshToken: string;
}