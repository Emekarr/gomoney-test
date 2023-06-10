import { DataStoreRepository } from "../../infrastructure/repository";
import TeamModel, {
  TeamDocument,
} from "../../infrastructure/database/schema/team";

export default class TeamRepository extends DataStoreRepository<TeamDocument> {
  constructor() {
    super(TeamModel);
  }
}
