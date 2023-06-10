import { DataStoreRepository } from "../../infrastructure/repository";
import FixtureModel, {
  FixtureDocument,
} from "../../infrastructure/database/schema/fixture";

export default class FixtureRepository extends DataStoreRepository<FixtureDocument> {
  constructor() {
    super(FixtureModel);
  }
}
