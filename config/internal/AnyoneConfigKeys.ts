import { AnyoneConfig } from '..'

const anyoneConfig: AnyoneConfig = {
  BASE_URL: '',
  API_URL: '',
  API_TIMEOUT: 0,
}

export const anyoneConfigKeys = Object.keys(
  anyoneConfig,
) as (keyof AnyoneConfig)[]
