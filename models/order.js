const Mongoose = require("mongoose");

const orderSchema = Mongoose.Schema({
    id: String,
    amount: Number,
    currency: String,
    order_id: Number,
    invoice_id : Number,
    card_id: Number,
    method: String,
    email: String,
    contact: Number,
    status: String,
    acquirer_data: Object,
    created_at: Number,
});

module.exports = Mongoose.model("orders", orderSchema);

// {
//     id: 'pay_HszFGLBXC9QStb',
//     entity: 'payment',
//     amount: 50000,
//     currency: 'INR',
//     status: 'authorized',
//     order_id: null,
//     invoice_id: null,
//     international: false,
//     method: 'netbanking',
//     amount_refunded: 0,
//     refund_status: null,
//     captured: false,
//     description: 'Test Transaction',
//     card_id: null,
//     bank: 'SBIN',
//     wallet: null,
//     vpa: null,
//     email: 'gaurav.kumar@example.com',
//     contact: '+918885860992',
//     notes: [],
//     fee: null,
//     tax: null,
//     error_code: null,
//     error_description: null,
//     error_source: null,
//     error_step: null,
//     error_reason: null,
//     acquirer_data: { bank_transaction_id: '1336308' },
//     created_at: 1630670922
//   }