import express from "express";
import handlebars from "express-handlebars"

import __dirname from "./utils.js";

import viewsRouter from "./routes/viewsRouter.js"
import sessionsRouter from "./routes/sessionsRouter.js"

const app = express();
const PORT = process.env.PORT || 8080


// View Engine
app.engine("handlebars", handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

// Middlewares
app.use(express.static(`${__dirname}/public`))
app.use(express.json());

// Routers
app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);

app.listen(PORT, console.log(`Listening on port: ${PORT}`));