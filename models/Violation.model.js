
import mongoose from 'mongoose'

const violationSchema = new mongoose.Schema({
    uid: { type: mongoose.Schema.Types.ObjectId, required: true }, // current user id, in browser cookie
type: { type: String, enum: ['missed_block', 'missed_ritual', 'failed_timer'], required: true },
timestamp: { type: Date, default: Date.now },
resolved: { type: Boolean, default: false },
tauntStatement: { type: String, default: false},
blockData: { type: Object, default: false}
})
// TODO I think we dont have  'missed_ritual' violation

export default mongoose.model('Violation', violationSchema)

