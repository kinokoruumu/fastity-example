import { Configure } from "./Configure";

export type ServerConfig = {
  TIMEOUT_RESPONSE_SERVER: number;
};

export type AnyoneConfig = {
  BASE_URL: string;
  API_URL: string;
  API_TIMEOUT: number;
};

export type Config = ServerConfig & AnyoneConfig;

let data: Config;

if (process.title === "browser") {
  data = (window as any).__CONFIG__ as Config;
} else {
  data = {
    ...require("./config.base").config,
    ...require(`./config.${process.env.NODE_ENV || "local"}`).config,
  };
}

export const config = new Configure(data);
