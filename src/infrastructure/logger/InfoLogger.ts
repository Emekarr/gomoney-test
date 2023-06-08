import BaseLogger from "./BaseLogger";

class InfoLogger extends BaseLogger {
  constructor() {
    super("info");
  }
}

export default Object.freeze(new InfoLogger());
