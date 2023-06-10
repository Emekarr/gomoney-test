import { TokenType } from "./contants";

export interface TokenGenPayload {
  email: string;
  id: string;
  name: string;
  type: TokenType;
  iss: string;
  admin: boolean;
}
