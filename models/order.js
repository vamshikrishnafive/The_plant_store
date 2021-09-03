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
