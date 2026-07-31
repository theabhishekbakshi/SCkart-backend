import mongoose from 'mongoose'

let cached = null

const connectDb = async()=>{
    if (cached) return cached;
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL,  {
            dbName: "Swapcart2026",
            serverSelectionTimeoutMS: 5000,
        })
        cached = conn
        console.log("Connected to mongoDb")
        return cached
    } catch (error) {
        console.log(error);
    }
}
export default connectDb
