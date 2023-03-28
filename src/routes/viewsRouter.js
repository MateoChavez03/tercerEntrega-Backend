import { Router } from "express";

const router = Router();

router.use('/register', (req, res) => {
    res.render('register')
})

router.use('/login', (req, res) => {
    res.render('login')
})

router.use('/home', (req, res) => {
    res.render('home')
})

export default router