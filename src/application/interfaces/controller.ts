import Team from "../../domain/entities/team";

export interface AuthControllerInterface {
  createAdmin(ctx: any): Promise<void>;
  createUser(ctx: any): Promise<void>;
  loginAdmin(ctx: any): Promise<void>;
  loginUser(ctx: any): Promise<void>;
}

export interface TeamControllerInterface {
  createTeam(ctx: any): Promise<void>;
  updateTeam(ctx: {
    responder: any;
    query: { id: string; adminID: string };
    body: Partial<Team>;
  }): Promise<void>;
  fetchTeam(ctx: {
    responder: any;
    query: { lastID: string; limit: number };
  }): Promise<void>;
  searchTeam(ctx: {
    responder: any;
    query: { limit: number };
    body: { name: string };
  }): Promise<void>;
  deleteTeamsUseCase(ctx: {
    id: string;
    adminID: string;
    responder: any;
  }): void;
}
