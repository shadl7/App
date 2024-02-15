import {Schema, model, Types} from 'mongoose';

const CollectionSchema = new Schema<ICollection>({
    name: {type: String, default: ''},
    content: {type: [Schema.Types.ObjectId], default: [], ref: 'Script'},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})

export const CollectionModel = model<ICollection>('Collection', CollectionSchema);

export interface ICollection {
    _id: Types.ObjectId;
    name: string;
    content: Types.ObjectId[];
    author: Types.ObjectId;
}