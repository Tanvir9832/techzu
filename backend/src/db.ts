import mongoose from "mongoose";
import { MONGO_URI } from "./config";

export const db =async()=>{
   try {
    await mongoose.connect(MONGO_URI)
    console.log("database connected! ")
   } catch (error) {
    console.log(error)
   }
}