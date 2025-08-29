import express, { Application, Request, Response } from "express";
import * as config from "./config";
import { db } from "./db";
import cookieParser from "cookie-parser";
import { applicationRoutes } from "./routes";
import cors from "cors"


const app: Application = express();

app.use(cors({
  origin: process.env.CORS,
  credentials: true,
}))
app.use(cookieParser());


// Middleware
app.use(express.json());

// Routes
applicationRoutes(app)



// Database setup 
db()

// Start server
app.listen(config.PORT, () => {
  console.log(`Server is running on http://localhost:${config.PORT}`);
});
