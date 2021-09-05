import Razorpay from 'razorPay';
import dotenv from 'dotenv';
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
            amount: 5000,
            currency: "INR"
        };
        razorPay.orders.create(options, function (err, order) {
            if (!err) {
                res.json(order);
            }
        });
    }
    static async fetchOrder(req, res) {
        const data = await razorPay.payments.fetch(req.body.razorpay_payment_id)
        const { id, amount, currency, order_id, invoice_id, card_id, method, email, contact, status, acquirer_data, created_at } = data;
        if (data.status === 'authorized') {
            res.send('Payment Successful')
            try {
                await storeOrder.create({ id, amount, currency, order_id, invoice_id, card_id, method, email, contact, status, acquirer_data, created_at })
            } catch (error) {
                console.error(error)
            }
        } else {
            res.redirect('/')
        }
    }
};
