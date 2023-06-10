import { Document, Schema, model } from "mongoose";

interface Admin {
  name: string;
  email: string;
  password: string;
}

export interface AdminDocument extends Document, Admin {}

const adminSchemaFields: Record<keyof Admin, any> = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
};

const adminSchema = new Schema(adminSchemaFields, { timestamps: true });

export default model<AdminDocument>("Admin", adminSchema);
