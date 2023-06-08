export default interface DataStoreInterface {
  // write
  createEntry(payload: any, ...args: any): Promise<any>;

  // read
  findByID(id: string, ...args: any): Promise<any>;
  findManyByFields(filter: any, ...args: any): Promise<any>;
  findOneByFields(filter: any, ...args: any): Promise<any>;
  findLast(filter: any): Promise<any>;

  // update
  updateByID(id: string, payload: any, ...args: any): Promise<any>;
  updateByFields(filter: any, payload: any, ...args: any): Promise<any>;
  saveData(payload: any, ...args: any): Promise<any>;

  // delete
  deleteMany(filter: any, ...args: any): Promise<any>;
  deleteByID(id: string, ...args: any): Promise<any>;

  // truncate
  __truncate(filter: any, ...args: any): void;

  // transactions
  startTransaction(session: any, job: () => Promise<any>): Promise<any>;
  startSession(): Promise<any>;
}
