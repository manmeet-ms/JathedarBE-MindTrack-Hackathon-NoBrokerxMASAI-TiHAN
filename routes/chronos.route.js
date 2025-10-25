/**
 *
 * reset p1 priority it is ultimately update request
 * create p2
 * update
 * delete
 */

import { Router } from "express";
import { 
    getChronos
,resetChronos
,createChronos
,updateChronos
,deleteChronos

 } from "../controllers/chronos.controller.js";
const router = Router();

router.get("/get", getChronos);
router.put("/reset/:id", resetChronos);
router.post("/create", createChronos);
router.put("/update/:id", updateChronos);
router.delete("/delete/:id", deleteChronos);
export default router;
 