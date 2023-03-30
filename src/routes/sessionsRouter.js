import { Router } from "express";
import passport from "passport";
import jwt  from "jsonwebtoken";

import userModel from "../dao/mongo/user.js";
import { createHash } from "../services/pwdencrypt.js";
import uploader from "../services/upload.js";
import config from "../config/config.js";
import { transporter } from "../services/mail.js";

const router = Router();

router.post('/register', uploader.single("avatar"), async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(500).send({status: "error", error: "Failed to load file"});
        const {first_name, last_name, adress, phone_number, email, password } = req.body;
        if (!first_name||!email||!password) return res.status(400).send({status: "error", error: "Empty fields"});
        const exists = await userModel.findOne({email});
        if (exists) return res.status(400).send({status: "error", error: "User already exists"});
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
        const mailOptions = await transporter.sendMail({
            from:'Server <mateochavez424@gmail.com>',
            to: "mateochavez424@gmail.com",
            subject:'New user',
            html:`
                <div>
                    <h1>New user</h1>
                </div>
                <ul>
                    <li>First name: ${user.first_name}</li>
                    <li>Last name: ${user.last_name}</li>
                    <li>Phone number: ${user.phone_number}</li>
                    <li>Adress: ${user.adress}</li>
                    <li>E-mail: ${user.email}</li>
                    <li>Hashed Password: ${user.password}</li>
                    <li>Profile picture: ${user.avatar}</li>
                </ul>`,
        })
        res.send({status: "success", payload: result});
    } catch (error) {
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