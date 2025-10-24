import logger from ".././utils/logger.utils.js";
import LoggedQuoteModel from "../models/LoggedQuote.model.js";
import PhilosopherQuote from "../models/PhilosopherQuote.model.js";

export const createQuotes = async (req, res) => {
  const quotesData = req.body;
  // logger("log","quotesData", quotesData);

  try {
    const result = await PhilosopherQuote.create(quotesData);
    // logger("log","res",res);
    res.send(result);
  } catch (error) {
    res.send(error.message);

    logger("error",error.message);
  }
};
export const getQuotes = async (req, res) => {
  try {
    const result = await PhilosopherQuote.find();

    res.json(result);
  } catch (error) {
    res.send(error.message);
    logger("error",error.message);
  }
};
export const getRandomQuote = async (req, res) => {
  try {
    const result = await PhilosopherQuote.aggregate([{ $sample: { size: 1 } }]);
    // logger("log",result);

    const id = (result[0]._id);
    const philosopher = result[0].philosopher.name;
    const traits = result[0].philosopher.qualities;
    const quote = result[0].quotes[Math.floor(Math.random() * result[0].quotes.length)];
    const blockToSend = { id, philosopher, quote, traits };
    // logger("log",blockToPush);

    await LoggedQuoteModel.create({ quoteId:id, philosopher, quote })

    res.json(result);
  } catch (error) {
    res.send(error.message);
    logger("error",error);
  }
};
export const flushAllQuotes = async (req, res) => {
  try {
    const result = await PhilosopherQuote.deleteMany();
    res.json(result);
  } catch (error) {
    res.send(error.message);
    logger("error",error);
  }
};
