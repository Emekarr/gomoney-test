export default interface User {
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}