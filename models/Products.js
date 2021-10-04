import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    /*image: {type: String} not sure*/
})

export default mongoose.model('Products', schema)