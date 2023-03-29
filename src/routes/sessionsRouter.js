import { Router } from "express";
import passport from "passport";
import jwt  from "jsonwebtoken";

import userModel from "../dao/mongo/user.js";
import { createHash } from "../services/pwdencrypt.js";
import uploader from "../services/upload.js";
import config from "../config/config.js";

const router = Router();

router.post('/register', uploader.single("avatar"), async (req, res) => {
    try {
        const file = req.file;
        !file && res.status(500).send({status: "error", error: "Failed to load file"});
        const {first_name, last_name, adress, phone_number, email, password } = req.body;
        !first_name||!email||!password && res.status(400).send({status: "error", error: "Empty fields"});
        const exists = await userModel.findOne({email});
        exists && res.status(400).send({status: "error", error: "User already exists"});
        const hashedPassword = await createHash(password);
        const user = {
            first_name,
            last_name,
            phone_number,
            adress,
            email,
            password: hashedPassword,
            avatar:`${req.protocol}://${req.hostname}:${config.server.PORT}/img/${file.filename}`
        }
        const result = await userModel.create(user);
        res.send({status: "success", payload: result});
    } catch (error) {
        console.log(error);
        res.status(500).send({status: "error", error: "Server error"})
    }
})

router.post('/login', passport.authenticate('login', {failureRedirect: "/api/sessions/loginFail", session: false}), async (req, res) => {
    try {
        const userToken = {
            name:`${req.user.first_name} ${req.user.last_name}`,
            email: req.user.email,
            role: req.user.role,
            id: req.user._id,
            avatar: req.user.avatar
        }
        const token = jwt.sign(userToken, config.jwt.SECRET, {expiresIn: "1d"});
        res.cookie(config.jwt.COOKIE, token).send({status: "success", message: "Logged in"})
    } catch (error) {
        res.status(500).send({status: "error", error: "Server error"})
    }
})

router.get("/loginFail", async (req, res) => {
    res.send({status: "error", error: "Error de logueo"})
})

export default router