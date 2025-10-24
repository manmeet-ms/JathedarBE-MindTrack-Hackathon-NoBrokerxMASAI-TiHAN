// TODO add cron to delete purge urges data posts 15 days , this way graphs will be crlean

import logger from ".././utils/logger.utils.js";
import Urges from "../models/Urge.model.js";
export const getUrges = async (req, res) => {
  let {limit } = req.query; //page number and paginationLimit items
 
  try {

    
    const urgesRes = await Urges.find()
      ;

      console.log(urgesRes.length);
      
    res.status(200).json( urgesRes);
  } catch (error) {
    logger("error","error is urge.controller.js :: getUrges()", error);
  }
};
export const logUrge = async (req, res) => {
  try {
    console.log(req.user);
    
    console.log("...req.body",{ ...req.body });
    
    await Urges.create({ ...req.body });
    res.send("OK");
  } catch (error) {
    logger("error","error at urge.controller.js :: logUrge()", error);
    res.status(400).json( error);
  }
  // res.send({"getUrges" : "hwllow"})
};
/**
 *
 * urge contekker
 * find by id which will be passed by f
 * fond by id
 * update the status
 */

export const resolveUrge = async (urgeId) => {
  try {
    const res = await Urges.findOneAndUpdate(urgeId);

    res.send("OK");
  } catch (error) {
    logger("error","error at urge.controller.js :: resolveUrge()", error);
    res.send("error at urge.controller.js :: resolveUrge()", error);
  }
};
