import { Router } from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { ROLE } from '../config.js'
import OrderTest from '../models/OrderTest.js'

const router = Router()

router.post('/api/orders/placeOrder', async (req, res) => {
    try {
        const order = new OrderTest({
            email: req.body.email,
            phone: req.body.phone,
            cart: req.body.cart,
            totalPrice: req.body.totalPrice
        })

        await order.save()
        await res.status(201).json(order)
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Error occured' })
    }
})

router.get('/api/orders', async (req, res) => {
    try {
        const orders = await OrderTest.find({})

        res.status(200).json(orders)
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Error occured' })
    }

})

router.get('/api/orders/:id', async (req, res) => {
    try {
        const order = await OrderTest.findById(req.params.id)
        res.status(200).json(order)
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Error occured' })
    }

})

router.put('/api/orders/confirmOrder/:id', authMiddleware([ROLE.ADMIN, ROLE.MODER]), async (req, res) => {
    try {
        const order = await OrderTest.findById(req.params.id)
        order.confirmed = req.body.confirmed
        res.status(200).json({confirmed: order.confirmed, _id: order._id})
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Error occured' })
    }

})

export default router
