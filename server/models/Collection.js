import pkg from 'mongoose';

const { Schema, model } = pkg;

const Collection = new Schema({
  userId: { type: String, unique: true, required: true },
  cards: [{ type: Number, ref: 'Pokemon numbers' }],
});

export default model('Collection', Collection);
