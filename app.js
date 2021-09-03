const express = require('express');
const Razorpay = require('razorPay');
const { v4: uuid } = require('uuid');

const storeOrder = require('./models/order');

const app = express()

app.set('views', 'view');
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const razorPay = new Razorpay({
    key_id: 'rzp_test_tCALVylF8FuC1B',
    key_secret: 'k8BNGM8mg9Fl7FwAyOQ5Bn4r'
})

app.get('/', (req, res) => res.render('razorPay'))
app.post('/order', (req, res) => {
    var options = {
        amount: 5000,
        currency: "INR",
        receipt: uuid()
    };
    razorPay.orders.create(options, function (err, order) {
        res.json(order);
    });
})
app.post('/order_completed', (req, res) => {
    razorPay.payments.fetch(req.body.razorpay_payment_id).then(data => {
        const { id, amount, currency, order_id, invoice_id, card_id, method, email, contact, status, acquirer_data, created_at} = data;
        if (data.status === 'authorized') {
            res.send('Payment Successful')
            try {
                storeOrder.create({ id, amount, currency, order_id, invoice_id, card_id, method, email, contact, status, acquirer_data, created_at})
            } catch (error) {
                console.error(error)
            }
        } else {
            res.redirect('/')
        }
    })
})

const mongoose = require('mongoose');
const port = 3000;

mongoose.connect('mongodb+srv://VamshiKrishna:vamshi1234@cluster0.bz0jl.mongodb.net/sample?retryWrites=true&w=majority')
    .then(() => console.log('connected to DB'))
    .then(() => app.listen(port, () => console.log(`app listening on port ${port}!`)))
    .catch((err) => console.error(err));

