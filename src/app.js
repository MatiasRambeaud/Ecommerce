import express from "express";
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import config from "./config/dotenv.config.js";
import __dirname from './utils.js';
import CartsRouter from "./routes/CartsRouter.js"
import ProductsRouter from "./routes/ProductsRouter.js";
import SessionsRouter from "./routes/SessionsRouter.js";
import initializePassportConfig from './config/passport.config.js';

const app = express();
const PORT = process.env.PORT||8080;
app.listen(PORT, ()=>console.log("server running."));

const connection = mongoose.connect(process.env.MONGO_URL);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

initializePassportConfig();
app.use(passport.initialize());

app.use("/api/sessions",SessionsRouter);
app.use("/api/products",ProductsRouter);
app.use("/api/cart",CartsRouter);
