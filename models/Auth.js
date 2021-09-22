import mongoose from 'mongoose'
import { ROLE } from '../config.js'

const schema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    roles: [{type: String, default: ROLE.USER, required: true}]
})

export default mongoose.model('Auth', schema)