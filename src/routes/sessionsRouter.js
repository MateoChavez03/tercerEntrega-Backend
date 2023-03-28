import { Router } from "express";

const router = Router();

router.use('/register', (req, res) => {
    res.send({status: "success", message: "Register"})
})

router.use('/login', (req, res) => {
    res.send({status: "success", message: "Login"})
})

export default router