import mongoose from 'mongoose'

const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL,  {
            dbName: "Swapcart2026",
        })
        console.log("Connected to mongoDb")
    } catch (error) {
        console.log(error);
    }
}
export default connectDb