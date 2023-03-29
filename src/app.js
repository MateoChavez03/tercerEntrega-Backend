import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import __dirname from "./utils.js";
import config from "./config/config.js";
import initializePassport from "./config/passportConfig.js"

import viewsRouter from "./routes/viewsRouter.js";
import sessionsRouter from "./routes/sessionsRouter.js";

const app = express();
const PORT = process.env.PORT || 8080
const connection = mongoose.connect(config.mongo.URL)

// View Engine
app.engine("handlebars", handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

// Middlewares
app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use(cookieParser())

initializePassport()

// Routers
app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);

app.listen(PORT, console.log(`Listening on port: ${PORT}`));