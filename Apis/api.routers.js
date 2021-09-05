import express from 'express';
import Payment from './controllers.js'

const Router = express.Router();

Router.route('/').get(Payment.welcomepage)
Router.route('/order').post(Payment.createOrder)
Router.route('/order_completed').post(Payment.fetchOrder)

export default Router;