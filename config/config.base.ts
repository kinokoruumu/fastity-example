import { Config } from './';

export const config: Config = {
  // Allowed for anyone
  BASE_URL: process.env.BASE_URL || '',
  API_URL: process.env.API_URL || '',
  API_TIMEOUT: parseInt(process.env.API_TIMEOUT || '5000', 10),

  // Allowed for only server
  TIMEOUT_RESPONSE_SERVER: 30000,
};
