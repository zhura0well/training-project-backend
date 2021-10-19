import mongoose from 'mongoose'
import { ROLE } from '../config.js'
import { ProductSchema } from './Products.js'

const localProductSchema = ProductSchema.clone()
localProductSchema.add({quantity: {type: Number, default: 0, required: true}})
const schema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    roles: [{type: String, default: ROLE.USER, required: true}],
    cart: {
        items: [localProductSchema],
        totalPrice: {type: Number, default: 0, required: true}
    }
})

export default mongoose.model('Auth', schema)