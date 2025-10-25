import express from "express";

import { createQuotes, flushAllQuotes, getQuotes, getRandomQuote } from "../controllers/philosopherQuote.controller.js";
 
const router = express.Router();

router.get("/quotes/get", 
   getQuotes);
router.get(
  "/quotes/random",

  getRandomQuote
);
router.post("/quotes/create",   createQuotes);
router.post("/quotes/flush" ,flushAllQuotes);
export default router;


