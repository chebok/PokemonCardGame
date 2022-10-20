import { model, Schema, Model, Document } from 'mongoose';

const CollectionSchema = new Schema({
  userId: { type: String, unique: true, required: true },
  cards: [{ type: Number, ref: 'Pokemon numbers' }],
});

export interface ICollection {
  userId: string;
  cards: number[];
}

export interface ICollectionModel extends ICollection, Document {}

export const Collection = model<ICollectionModel>('Collection', CollectionSchema);