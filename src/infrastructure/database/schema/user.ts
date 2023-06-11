import { Document, Schema, model } from "mongoose";

interface User {
  name: string;
  email: string;
  password?: string;
}

export interface UserDocument extends Document, User {}

const userSchemaFields: Record<keyof User, any> = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
};

const userSchema = new Schema(userSchemaFields, { timestamps: true });

export default model<UserDocument>("User", userSchema);
