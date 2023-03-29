import { Router } from "express";

import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const router = Router();

router.use('/register', (req, res) => {
    res.render('register')
})

router.use('/login', (req, res) => {
    res.render('login')
})

router.use('/home', (req, res) => {
    const token = req.cookies[config.jwt.COOKIE];
    const user = jwt.verify(token, config.jwt.SECRET);
    res.render('home', {user})
})

router.use("/loginFail", (req, res) => {
    res.render('register')
})

export default router