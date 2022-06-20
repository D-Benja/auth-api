import { CookieOptions } from "express";
import config from "config";

const isProduction = config.get("node_env") === "production";

export enum TokenExpiration {
  Access = 15 * 60,
  Refresh = 7 * 24 * 60 * 60,
}

export const defaultCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "strict" : "lax",
  domain: isProduction ? config.get("client_url") : undefined,
  path: "/",
};

export const refreshTokenCookieOptions: CookieOptions = {
  ...defaultCookieOptions,
  maxAge: TokenExpiration.Refresh * 1000,
};

export const accessTokenCookieOptions: CookieOptions = {
  ...defaultCookieOptions,
  maxAge: TokenExpiration.Access * 1000,
};
