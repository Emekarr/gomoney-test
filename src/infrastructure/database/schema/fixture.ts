import { Document, Schema, Types, model } from "mongoose";

export interface Fixture {
  createdBy: string;
  name: string;
  completed: boolean;
  teamOneName: string;
  teamOneID: string;
  teamTwoName: string;
  teamTwoID: string;
}

export interface FixtureDocument extends Document, Fixture {}

const fixtureSchemaFields: Record<keyof Fixture, any> = {
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Types.ObjectId,
    required: true,
    ref: "Admin",
    index: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  teamOneName: {
    type: String,
    required: true,
  },
  teamOneID: {
    type: Types.ObjectId,
    required: true,
    ref: "Team",
    index: true,
  },
  teamTwoName: {
    type: String,
    required: true,
  },
  teamTwoID: {
    type: Types.ObjectId,
    required: true,
    ref: "Team",
    index: true,
  },
};

const fixtureSchema = new Schema(fixtureSchemaFields, { timestamps: true });

export default model<FixtureDocument>("Fixture", fixtureSchema);
