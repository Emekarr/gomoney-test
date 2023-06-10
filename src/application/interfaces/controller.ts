export default interface AuthControllerInterface {
  createAdmin(ctx: any): Promise<void>;
  loginAdmin(ctx: any): Promise<void>;
}
