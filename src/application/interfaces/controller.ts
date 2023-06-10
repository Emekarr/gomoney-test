export interface AuthControllerInterface {
  createAdmin(ctx: any): Promise<void>;
  createUser(ctx: any): Promise<void>;
  loginAdmin(ctx: any): Promise<void>;
  loginUser(ctx: any): Promise<void>;
}

export interface TeamControllerInterface {
  createTeam(ctx: any): Promise<void>;
  fetchTeam(ctx: {
    responder: any;
    query: { lastID: string; limit: number };
    body: { name: string };
  }): Promise<void>;
  deleteTeamsUseCase(ctx: {
    id: string;
    adminID: string;
    responder: any;
  }): void;
}
