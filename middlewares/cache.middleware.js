// middlewares/cache.middleware.js
import logger from "../utils/logger.utils.js";
import { redisClient } from "../config/redis.js";

export const cacheMiddleware = (keyPrefix, ttl = 60) => {
  // console.log("Cache requested but empty fn() atm... | Check next() if not moving forward")
 
  return async (req, res, next) => {
    try {
      const key = `${keyPrefix} : ${req.originalUrl}`; // : is a delimitter so we get a folder like view
    //   const key = `${keyPrefix}:${req.originalUrl.replace("/api/e/", "")}`;
      const cachedValue = await redisClient.get(key);

      if (cachedValue && (req.query.cache === true || req.query.cache === undefined)) {
        logger("cache","⚡Cache hit:", key);
        return res.json(JSON.parse(cachedValue));
      }
      logger("cache","✜ Cache miss:", key);

      // Monkey-patch res.json to save the response into Redis
      const originalJson = res.json.bind(res);
      res.json = (data) => {
        redisClient.setex(key, ttl, JSON.stringify(data)); // cache with TTL
        return originalJson(data);
      };

      next();
    } catch (err) {
      console.error("Cache middleware error:", err);
      next(); // fallback gracefully
    }
  };
};
