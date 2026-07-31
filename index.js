import dns from 'node:dns'
import express from 'express'
import dotenv from 'dotenv'
import connectDb from './utils/db.js'
import cloudinary from 'cloudinary'
import cors from "cors"

dns.setServers(['8.8.8.8', '1.1.1.1'])

dotenv.config()

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// importing routes
import userRoutes from './routes/user.route.js'
import productRoutes from './routes/product.route.js'
import cartRoutes from './routes/cart.route.js'
import addressRoutes from './routes/address.route.js'
import orderRoutes from './routes/order.route.js'

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cors());

//using routes
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);

connectDb()

export default app

// Only run the HTTP server locally. On Vercel the app is exported as a
// serverless function, so app.listen() must not be called there.
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`server is running on http://localhost:${PORT}`)
    })
}
