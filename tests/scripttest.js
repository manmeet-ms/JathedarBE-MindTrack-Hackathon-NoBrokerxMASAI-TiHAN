import mongoose from "mongoose"
import  "dotenv/config";
const connecttodb=async()=>{
try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("connetc subccesfl");
    
  } catch (error) {
  console.log(error);
  
}

}
connecttodb