import pkg from 'mongoose';

const { Schema, model } = pkg;

const Role = new Schema({
  value: { type: String, unique: true, default: 'USER' },
});

export default model('Role', Role);
