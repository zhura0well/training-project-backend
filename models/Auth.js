import mongoose from 'mongoose'
import { ROLE } from '../config.js'
import Products from './Products.js'

const schema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String},
    lastName: {type: String},
    roles: [{type: String, default: ROLE.USER, required: true}],
    cart: {
        items: [
            {
                item: { type: mongoose.Schema.Types.ObjectId, ref: Products } ,
                quantity: { type: Number, default: 0, required: true }
            }
        ],
        totalPrice: {type: Number, default: 0, required: true}
    }
})

export default mongoose.model('Auth', schema)