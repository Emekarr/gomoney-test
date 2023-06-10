export interface AuthControllerInterface {
  createAdmin(ctx: any): Promise<void>;
  createUser(ctx: any): Promise<void>;
  loginAdmin(ctx: any): Promise<void>;
  loginUser(ctx: any): Promise<void>;
}

export interface TeamControllerInterface {
  createTeam(ctx: any): Promise<void>;
}
