import mongooose, { connect, connection, ConnectOptions } from "mongoose";
import InfoLogger from "../../../logger/InfoLogger";
import ErrorLogger from "../../../logger/ErrorLogger";
import config from "../../../../config";


class MongooseConnection {
  constructor(){
    mongooose.set('toJSON', {
      transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
      }
    })
  }

  connect() {
    connect(config.getMongoURL()!, {
      dbName: config.getDatabaseName(),
    } as ConnectOptions)
      .then(() => {
        InfoLogger.write("db connection successful");
      })
      .catch((err) => {
        ErrorLogger.write(`db connection failed -- ${err.message}`);
        process.kill(process.pid, "SIGTERM");
      });
  }

  // FOR TESTING PURPOSES ONLY
  async dropDB() {
    // used to clear the database in a TEST environment
    if (process.env.NODE_ENV === "test") {
      await connection.dropDatabase();
    }
  }
}

export default new MongooseConnection();
