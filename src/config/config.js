export default {
    mongo: {
        URL: process.env.MONGO_URL || "mongodb+srv://CoderUser:123@clustermateochavez38140.scwmyko.mongodb.net/eccomerce?retryWrites=true&w=majority"
    },
    jwt: {
        COOKIE: process.env.JWT_COOKIE || "AuthCookie",
        SECRET: process.env.JWT_SECRET || "srjkhlfghjeb"
    },
    nodemailer: {

    },
    server: {
        PORT: process.env.PORT || 8080
    }
}