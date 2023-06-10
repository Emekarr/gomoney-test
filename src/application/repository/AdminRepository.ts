import { DataStoreRepository } from "../../infrastructure/repository";
import AdminModel, {
  AdminDocument,
} from "../../infrastructure/database/schema/admin";

export default abstract class AdminRepository extends DataStoreRepository<AdminDocument> {
  constructor() {
    super(AdminModel);
  }
}
