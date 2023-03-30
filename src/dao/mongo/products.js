import mongoose from "mongoose";

const collection = "products"

const schema = new mongoose.Schema({
    name: {type: String, required: true},
    img: {type: String, required: true},
    filter: {type: String, required: true}
})

const productsModel = mongoose.model(collection, schema)

export default productsModel