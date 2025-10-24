
import Ritual from '../models/Ritual.model.js'
import dayjs from 'dayjs'
import logger from '../utils/logger.utils.js'

export const checkInRitual = async (req, res) => {
try {
const today = dayjs().format('YYYY-MM-DD')
const ritual = await Ritual.create({ date: today, vow: req.body.vow, completedCheckIn: true, uid:req.user.id })
logger("success","ritualcreated",ritual)
res.json(ritual)
} catch (err) {
res.status(500).json({ error: err.message })
}
}

export const getTodayRitual = async (req, res) => {
try {
const today = dayjs().format('YYYY-MM-DD')
const ritual = await Ritual.find({uid:req.user.id})
// const ritual = await Ritual.find({ date: today })
// const ritual = await Ritual.findOne({ date: today })
res.status(200).json(ritual)
// logger("log","New ritual created: ",ritual);

} catch (err) {
res.status(500).json({ error: err.message })
}
}

export const flushRituals = async (req, res) => {
  try {
    await Ritual.deleteMany({});
    logger("log","Flushed all Rituals");
    res.json({message:true});

    return true
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
