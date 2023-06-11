import { Document, Schema, Types, model } from "mongoose";

export interface Team {
  createdBy: string;
  name: string;
}

export interface TeamDocument extends Document, Team {}

const teamSchemaFields: Record<keyof Team, any> = {
  name: {
    type: String,
    required: true,
    index: true,
  },
  createdBy: {
    type: Types.ObjectId,
    required: true,
    ref: "Admin",
    index: true,
  },
};

const teamSchema = new Schema(teamSchemaFields, { timestamps: true });

export default model<TeamDocument>("Team", teamSchema);
