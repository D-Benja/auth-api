import { Response } from "express";
import {
  accessTokenCookieOptions,
  defaultCookieOptions,
  refreshTokenCookieOptions,
} from "./cookiesOptions";

export function setTokens(res: Response, access: string, refresh?: string) {
  res.cookie("AccessToken", access, accessTokenCookieOptions);
  if (refresh) res.cookie("RefreshToken", refresh, refreshTokenCookieOptions);
}

export function clearTokens(res: Response) {
  res.clearCookie("AccessToken", { ...defaultCookieOptions, maxAge: 0 });
  res.clearCookie("RefreshToken", { ...defaultCookieOptions, maxAge: 0 });
}
