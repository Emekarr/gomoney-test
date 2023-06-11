import {
  Model,
  ClientSession,
  Document,
  SaveOptions,
  ProjectionType,
  QueryOptions,
  UpdateAggregationStage,
  UpdateWithAggregationPipeline,
  UpdateQuery,
} from "mongoose";
import DataStoreInterface from "../../../application/interfaces/DataStoreInterface";

export default abstract class MongodbRepository<
  T extends Document<any, any, any>
> implements DataStoreInterface
{
  constructor(private model: Model<any>) {}

  async count(filter: any): Promise<number> {
    return await this.model.count(filter);
  }

  async createEntry(
    payload: Partial<T>,
    args: Partial<SaveOptions>
  ): Promise<T> {
    return (await this.model.create(payload)).toObject();
  }

  async findByID(
    id: string,
    fields: Partial<ProjectionType<T>>,
    opts: Partial<QueryOptions>
  ): Promise<T | null> {
    return await this.model.findById(id, fields, opts);
  }

  async findManyByFields(
    filter: any,
    fields: Partial<ProjectionType<T>>,
    opts: Partial<QueryOptions>
  ): Promise<T[]> {
    return await this.model.find(filter, fields, opts).lean();
  }

  async findOneByFields(
    filter: any,
    fields: Partial<ProjectionType<T>>,
    opts: Partial<QueryOptions>
  ): Promise<T | null> {
    return await this.model.findOne(filter, fields, opts);
  }

  async findLast(filter: any): Promise<T> {
    return (
      (await this.model.find(filter).sort({ _id: -1 }).limit(1)) as T[]
    )[0];
  }

  async updateByID(
    id: string,
    payload: Partial<UpdateQuery<T>> | Partial<UpdateWithAggregationPipeline>,
    opts: Partial<QueryOptions>
  ): Promise<T> {
    return await this.model
      .updateOne(
        {
          _id: id,
        },
        payload,
        { ...opts, new: true }
      )
      .lean();
  }

  async updateByFields(
    filter: any,
    payload: Partial<UpdateQuery<T>> | Partial<UpdateWithAggregationPipeline>,
    opts: Partial<QueryOptions>
  ): Promise<T[]> {
    return await this.model.updateMany(filter, payload, opts).lean();
  }

  async saveData(payload: T, opts: SaveOptions): Promise<T> {
    return await payload.save(opts);
  }

  async deleteMany(filter: any, opts: Partial<QueryOptions>): Promise<T> {
    return await this.model.deleteMany(filter, opts).lean();
  }

  async deleteByID(id: string, opts: Partial<QueryOptions>): Promise<T[]> {
    return await this.model
      .deleteOne(
        {
          _id: id,
        },
        opts
      )
      .lean();
  }

  // for use only for testing
  async __truncate(filter: any, ...args: any): Promise<void> {
    if (
      process.env.NODE_ENV === "testing" ||
      process.env.NODE_ENV === "development"
    ) {
      await this.model.deleteMany(filter);
    }
  }

  async startTransaction(
    session: ClientSession,
    job: () => Promise<any>
  ): Promise<any> {
    try {
      session.startTransaction();
      const result = await job();
      await session.commitTransaction();
      return result;
    } catch (err: any) {
      await session.abortTransaction();
      throw err; // Propagate the error to the calling code
    } finally {
      session.endSession();
    }
  }

  async startSession(): Promise<ClientSession> {
    return this.model.startSession();
  }
}
