import { Router } from "express";

import { executePolicies } from "../middlewares/Auth.js";
import productsModel from "../dao/mongo/products.js"

const router = Router();

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/home', executePolicies(["AUTHENTICATED"]), async (req, res) => {
    const products = await productsModel.find().lean();
    res.render('home', {user: req.user, products})
})

router.get('/cart', executePolicies(["AUTHENTICATED"]), (req, res) => {
    res.render('cart', {user: req.user, cart})
})

router.get('/profile', executePolicies(["AUTHENTICATED"]), (req, res) => {
    res.render('profile', {user: req.user})
})

export default router