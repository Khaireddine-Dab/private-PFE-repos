/**
 * Cache Redis pour la recherche et le monitoring.
 * Utilise @upstash/redis (REST) — même stack que feed-cache / intent-cache.
 *
 * Configuration (.env.local):
 *   UPSTASH_REDIS_REST_URL=https://...upstash.io
 *   UPSTASH_REDIS_REST_TOKEN=AX...
 */

import { Redis } from '@upstash/redis'

let redisClient: Redis | null = null

function getRedisClient(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null

  if (!redisClient) {
    redisClient = new Redis({ url, token })
  }

  return redisClient
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  const client = getRedisClient()
  if (!client) return null

  try {
    const value = await client.get<T>(key)
    return value ?? null
  } catch (err) {
    console.error(`[Cache] Erreur get(${key}):`, err)
    return null
  }
}

export async function cacheSet<T>(
  key: string,
  value: T,
  ttlSeconds: number = 3600,
): Promise<boolean> {
  const client = getRedisClient()
  if (!client) return false

  try {
    await client.set(key, value, { ex: ttlSeconds })
    return true
  } catch (err) {
    console.error(`[Cache] Erreur set(${key}):`, err)
    return false
  }
}

export async function cacheDel(key: string): Promise<boolean> {
  const client = getRedisClient()
  if (!client) return false

  try {
    const result = await client.del(key)
    return result > 0
  } catch (err) {
    console.error(`[Cache] Erreur del(${key}):`, err)
    return false
  }
}

export async function cacheDelPattern(pattern: string): Promise<number> {
  const client = getRedisClient()
  if (!client) return 0

  try {
    const keys = await client.keys(pattern)
    if (!keys.length) return 0
    return await client.del(...keys)
  } catch (err) {
    console.error(`[Cache] Erreur delPattern(${pattern}):`, err)
    return 0
  }
}

export async function getCacheStats() {
  const client = getRedisClient()
  if (!client) return null

  try {
    const keys = await client.dbsize()
    return {
      connected: true,
      totalKeys: keys,
    }
  } catch (err) {
    console.error('[Cache] Erreur getCacheStats:', err)
    return null
  }
}

export async function closeRedis(): Promise<void> {
  redisClient = null
}

export function normalizeCacheKey(
  prefix: string,
  ...parts: (string | number | undefined)[]
): string {
  const filtered = parts
    .filter(p => p !== undefined && p !== null && p !== '')
    .map(p => String(p).toLowerCase().replace(/\s+/g, '-'))

  return `${prefix}:${filtered.join(':')}`
}

export async function cacheGetOrSet<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds: number = 3600,
): Promise<T> {
  const cached = await cacheGet<T>(key)
  if (cached) return cached

  try {
    const fresh = await fetcher()
    await cacheSet(key, fresh, ttlSeconds)
    return fresh
  } catch (err) {
    console.error(`[Cache] Erreur getOrSet(${key}):`, err)
    throw err
  }
}
