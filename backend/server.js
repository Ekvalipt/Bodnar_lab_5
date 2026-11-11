import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./services/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

const allowedOrigins = process.env.CLIENT_ORIGINS 
  ? process.env.CLIENT_ORIGINS.split(",") 
  : [];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

app.use("/products", productRoutes);

const dbURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mydb";
connectDB(dbURI);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
