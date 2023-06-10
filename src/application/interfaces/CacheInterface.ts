export default interface CacheInterface {
  // write
  createEntry(key: string, payload: any, ...args: any): Promise<any>;
  createSet(key: string, payload: any, ...args: any): Promise<any>;

  // read
  findSet(key: string): Promise<any>;
  findEntry(key: string): Promise<any>;

  // update
  updateOne(key: string, payload: any): Promise<any>;
  updateSet(key: string, payload: any): Promise<any>;

  // delete
  deleteOne(key: string): Promise<any>;
  deleteFromSet(key: string, payload: any[]): Promise<any>;

  __truncate(): void;
}
