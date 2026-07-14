import redis
import asyncio

try:
    r = redis.Redis.from_url("rediss://default:gQAAAAAAAnQgAAIgcDIzODI4ZTBhNGRhMmU0YTBkODExNWZiNWFkZjE3YWZlYQ@rich-cub-160800.upstash.io:6379")
    r.set('foo', 'bar')
    value = r.get('foo')
    print(f"Sync Redis Test: {value}")
except Exception as e:
    print(f"Sync Redis Error: {e}")
