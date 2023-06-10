export default interface HasherInterface {
  hash(payload: string): Promise<string>;
  verifyHash(payload: string, hash: string): Promise<boolean>;
}
