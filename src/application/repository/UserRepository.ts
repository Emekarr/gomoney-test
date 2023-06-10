import { DataStoreRepository } from "../../infrastructure/repository";
import UserModel, {
  UserDocument,
} from "../../infrastructure/database/schema/user";

export default class Userepository extends DataStoreRepository<UserDocument> {
  constructor() {
    super(UserModel);
  }
}
