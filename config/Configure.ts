import { AnyoneConfig } from ".";
import { anyoneConfigKeys } from "./internal/AnyoneConfigKeys";

export class Configure<T extends Object> {
  private config: T;

  public constructor(config: T) {
    this.config = Object.freeze(config);
  }

  public get<K extends keyof T>(key: K): T[K] {
    return this.config[key];
  }

  public dehydrate(): AnyoneConfig {
    return Object.keys(this.config)
      .filter((key) => anyoneConfigKeys.includes(key as any))
      .reduce<any>(
        (cur, key) => ({
          ...cur,
          [key]: (this.config as any)[key],
        }),
        {},
      );
  }
}
