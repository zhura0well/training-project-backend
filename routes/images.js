import { Router } from 'express'
import multer from 'multer'
import { uploadFile } from '../aws_s3.js'
const router = Router()

const upload = multer({ dest: 'uploads/'})
router.post('/api/images', upload.single('file'), async (req, res) => {
    try {
        const file = req.file
        console.log(file)
        const result = await uploadFile(file)
        console.log(result.Location)
        return res.status(201).json({ image: result.Location })
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Error occured' })
    }
})

router.get('/api/images', upload.single('file'), async (req, res) => {
    try {
        const file = req.file
        console.log(file)
        const result = await uploadFile(file)
        console.log(result.Location)
        return res.status(201).json({ image: result.Location })
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Error occured' })
    }
})

export default router