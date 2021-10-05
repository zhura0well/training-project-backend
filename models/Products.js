import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    price: {type: Number, required: true, default: 0},
    quantity: {type: Number, required: true, default: 0}
    /*image: {type: String} not sure*/
})

export default mongoose.model('Products', schema)