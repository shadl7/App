import {Schema, model, Types} from 'mongoose';

const ScriptSchema = new Schema<IScript>({
    name: {type: String, default: ''},
    content: {type: String, default: ''},
    config: {type: String, default: ''},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})

export const ScriptModel = model<IScript>('Script', ScriptSchema);

export interface IScript {
    _id: Types.ObjectId;
    name: string;
    content: string;
    config: string;
    author: Types.ObjectId;
}