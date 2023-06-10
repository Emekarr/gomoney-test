export default interface Admin {
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}
