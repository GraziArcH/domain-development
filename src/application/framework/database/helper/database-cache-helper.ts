
import { ArchFramework } from 'versatus-arch-framework/arch-framework'
import CacheCore from 'versatus-arch-framework/src/core/CacheCore'

export class DatabaseCacheHelper {
  private client: CacheCore

  constructor() {
    this.client = ArchFramework.getCacheInstance()
  }


  async set(key: string, value: string, expireIn: number = 3600): Promise<void> {
    return this.client.set(key, value, expireIn)
  }

  async get(key: string): Promise<string> {
    return this.client.getVal(key)
  }

  async getKeys(): Promise<string[]> {
    return this.client.getKeys('*')
  }

  async del(key: string): Promise<void> {
    return this.client.del(key)
  }
}
