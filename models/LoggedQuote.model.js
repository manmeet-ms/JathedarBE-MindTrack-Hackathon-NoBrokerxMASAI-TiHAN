import mongoose from "mongoose";
const loggedQuoteSchema = new mongoose.Schema({
  quoteId: {type:String,required:true} ,
  philosopher: {type:String, required:true} ,
  quote: {type:String, required:true},
 
},{timestamps: true});

export default mongoose.model("LoggedQuote", loggedQuoteSchema);
