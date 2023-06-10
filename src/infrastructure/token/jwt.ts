import jwt from "jsonwebtoken";
import { TokenType } from "./contants";
import { TokenGenPayload } from "./type";
import config from "../../config";

export default abstract class AuthTokensManager {
  private static jwt = jwt;

  static async generateAccessToken(payload: Partial<TokenGenPayload>) {
    payload.type = TokenType.ACCESS_TOKEN;
    return this.generateTokens(
      payload as TokenGenPayload,
      config.getAccessTokenLife()
    );
  }

  static async generateRefreshToken(payload: Partial<TokenGenPayload>) {
    payload.type = TokenType.REFRESH_TOKEN;
    return this.generateTokens(
      payload as TokenGenPayload,
      config.getRefreshTokenLife()
    );
  }

  private static async generateTokens(
    payload: TokenGenPayload,
    expiresIn: number
  ) {
    return this.jwt.sign(payload, config.getJWTSecret(), {
      expiresIn,
      issuer: process.env.JWT_ISSUER,
    });
  }

  static async verifyToken(token: string) {
    return this.jwt.verify(token, config.getJWTSecret());
  }
}
