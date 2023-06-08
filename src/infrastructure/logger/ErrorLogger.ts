import BaseLogger from "./BaseLogger";

class ErrorLogger extends BaseLogger {
  constructor() {
    super("error");
  }
}

export default Object.freeze(new ErrorLogger());
