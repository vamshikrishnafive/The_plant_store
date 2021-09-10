import Mongoose from "mongoose"

const orderSchema = Mongoose.Schema({
    id: String,
    amount: Number,
    currency: String,
    order_id: String,
    entity : String,
    captured: Boolean,
    description: String,
    bank:  String,
    wallet: String,
    fee: Number,
    card_id: String,
    method: String,
    email: String,
    contact: Number,
    status: String,
    acquirer_data: Object,
    created_at: Number,
});

export default Mongoose.model("orders", orderSchema);


