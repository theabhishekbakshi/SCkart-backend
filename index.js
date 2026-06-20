import express from 'express'
import dotenv from 'dotenv'
import connectDb from './utils/db.js'
import cloudinary from 'cloudinary'
import cors from "cors"

dotenv.config()

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cors());

// importing routes
import userRoutes from './routes/user.route.js'
import productRoutes from './routes/product.route.js'
import cartRoutes from './routes/cart.route.js'
import addressRoutes from './routes/address.route.js'
import orderRoutes from './routes/order.route.js'




//using routes
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);

app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`)
    connectDb()
})