declare namespace Express {
  interface Request {
    user: {
      email: string;
      id: string;
      name: string;
      admin: boolean;
    };
  }
}
