import { model, Schema, Model, Document } from 'mongoose';

export interface IRole {
  value: string;
}

export interface IRoleModel extends IRole, Document {}

const RoleSchema = new Schema({
  value: { type: String, unique: true, default: 'USER' },
});

export const Role = model<IRoleModel>('Role', RoleSchema);