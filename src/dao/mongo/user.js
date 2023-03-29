import mongoose from "mongoose";

const collection = "Users";

const schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    adress: String,
    phone_number: {
        type: Number
    },
    role: {
        type: String,
        default: 'user'
    },
    avatar: {
        type: String,
        default: "Hola"
    }
})

const userModel = mongoose.model(collection, schema);

export default userModel;