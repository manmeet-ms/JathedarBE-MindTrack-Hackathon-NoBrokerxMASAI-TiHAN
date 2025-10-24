import express from "express";

import { createQuotes, flushAllQuotes, getQuotes, getRandomQuote } from "../controllers/philosopherQuote.controller.js";
import { cacheMiddleware } from "../middlewares/cache.middleware.js";
 
const router = express.Router();

router.get("/quotes/get", cacheMiddleware("getQuotes", 7 * 24 * 60 * 60), getQuotes);
router.get(
  "/quotes/random",

  getRandomQuote
);
router.post("/quotes/create",   createQuotes);
router.post("/quotes/flush" ,flushAllQuotes);
export default router;


