import { Router } from 'express'
import multer from 'multer'
import fs from 'fs'
import util from 'util'
import Products from '../models/Products.js'
import AWS from 'aws-sdk'
import dotenv from 'dotenv'
dotenv.config()

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const unlinkFile = util.promisify(fs.unlink)
const upload = multer({ dest: 'uploads/' })
const router = Router()


const s3 = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey
})

function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise()
}


function getFileStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream()
}

router.put('/api/images/:productId', upload.single('file'), async (req, res) => {
    try {
        const file = req.file

        const result = await uploadFile(file)

        const product = await Products.findByIdAndUpdate(req.params.productId, { imageKey: result.key }, { new: true })

        await unlinkFile(file.path)
        return res.status(200).json(product)
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Error occured' })
    }
})

router.get('/api/images/:productId', upload.single('file'), async (req, res) => {
    try {

        const product = await Products.findById(req.params.productId)
        const key = product.imageKey

        const readStream = getFileStream(key)

        readStream.pipe(res)
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Error occured' })
    }
})

export default router