import { model, Schema, Model, Document } from 'mongoose';

const DeckSchema = new Schema({
  userId: { type: String, unique: true, required: true },
  cards: [{ type: Number, ref: 'active Pokemons' }],
});

export interface IDeck {
  userId: string;
  cards: number[];
}

export interface IDeckModel extends IDeck, Document {}

export const Deck = model<IDeckModel>('Deck', DeckSchema);