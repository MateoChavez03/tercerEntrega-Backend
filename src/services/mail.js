import nodemailer from "nodemailer";
import config from "../config/config.js";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
        user: "mateochavez424@gmail.com",
        pass: config.nodemailer.PWD
    },
    tls: {
        rejectUnauthorized: false
    }
})