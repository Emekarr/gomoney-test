import bcrypt from "bcrypt";
import HasherInterface from "./HasherInterface";

export default class BcryptHasher implements HasherInterface {
  async verifyHash(payload: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(payload, hash);
  }

  async hash(payload: string): Promise<string> {
    return await bcrypt.hash(payload, 10);
  }
}
