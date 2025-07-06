import express from "express";
import cors from "cors";
import {nanoid} from "nanoid"; // breaking because nonoid does not give default export
import connectDB from "./src/config/mongo.config.js";
import dotenv from "dotenv"
dotenv.config("./.env")
import cookieParser from "cookie-parser";

import shortUrlroutes from "./src/routes/shorturl.route.js"
import authRoutes from "./src/routes/auth.routes.js"
import userRoutes from "./src/routes/user.routes.js"
import { redirectFromShorturl } from "./src/controller/shortUrl.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import { attachUser } from "./src/utils/attachUser.js";

const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'https://url-shortener-frontend-gilt.vercel.app',
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(attachUser);

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/create", shortUrlroutes)
app.get("/:id", redirectFromShorturl)

app.use(errorHandler);


app.listen(process.env.PORT,()=>{
    connectDB();
    console.log(`server is running on PORT: $`);
})



// GET -> Redirection (come directly on Backend)
// POST -> Create short Url
