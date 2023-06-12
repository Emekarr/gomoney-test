import mongoose, { connect, connection, ConnectOptions } from "mongoose";
import InfoLogger from "../../../logger/InfoLogger";
import ErrorLogger from "../../../logger/ErrorLogger";
import config from "../../../../config";

class MongooseConnection {
  constructor() {
    mongoose.set("toJSON", {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    });
  }

  connect() {
    mongoose
      .connect(config.getMongoURL()!, {
        dbName: config.getDatabaseName(),
      } as ConnectOptions)
      .then(() => {})
      .catch((err) => {});

    mongoose.connection.on("connected", () => {
      InfoLogger.write("db connection successful");
    });

    mongoose.connection.on("error", () => {
      ErrorLogger.write(`db connection failed -- `);
      process.kill(process.pid, "SIGTERM");
    });
  }

  // FOR TESTING PURPOSES ONLY
  async dropDB() {
    // used to clear the database in a TEST environment
    if (process.env.NODE_ENV === "test") {
      await mongoose.connection.dropDatabase();
    }
  }
}

export default new MongooseConnection();
