import pkg from 'mongoose';

const { Schema, model } = pkg;

const Deck = new Schema({
  userId: { type: String, unique: true, required: true },
  cards: [{ type: Number, ref: 'active Pokemons' }],
});

export default model('Deck', Deck);
