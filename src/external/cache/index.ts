import Redis from 'ioredis'

class Cache {
  private readonly redis: Redis

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
      keyPrefix: 'point_control: '
    })
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.redis.get(key)
    return value ? JSON.parse(value) : null
  }

  set(key: string, value: string | number | Buffer, timeExp?: number) {
    return this.redis.set(key, value, 'EX', timeExp)
  }

  delete(key: string) {
    return this.redis.del(key)
  }
}

export const cache = new Cache()
