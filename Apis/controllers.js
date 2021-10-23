import Razorpay from 'razorPay';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';    
import storeOrder from '../Models/order.js';
dotenv.config()

const razorPay = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
})

export default class Payment {
    static welcomepage(req, res) { res.render('razorPay') }
    static createOrder(req, res) {
        var options = {
            amount: 10000,
            currency: "INR",
            receipt: `VA-${uuidv4()}`,
        };
        razorPay.orders.create(options, function (err, order) {
            if (!err) {
                res.json(order);
            } else console.log(err)
        });
    }
    static async fetchOrder(req, res) {
        const data = await razorPay.payments.fetch(req.body.razorpay_payment_id)
        const { id, entity, amount, currency, order_id, card_id, method, email, contact, status, acquirer_data, created_at, captured, description, bank, wallet, fee } = data;
        if (data.status === 'captured') {
            res.send('Payment Successful')
            try {
                await storeOrder.create({ id, entity, amount, currency, order_id, card_id, method, email, contact, status, acquirer_data, created_at, captured, description, bank, wallet, fee })
            } catch (error) {
                console.error(error)
            }
        } else {
            res.redirect('/')
        }
    }
};
