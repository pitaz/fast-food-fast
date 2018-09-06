/* eslint-disable class-methods-use-this */
import express from 'express';
import orders from '../sampleData/ordersStorage';

const router = express.Router();
router.use(express.json());

class OrdersControllers {
  placeOrder(req, res) {
    const order = {
      id: orders.length + 1,
      meal: req.body.meal,
      quantity: req.body.quantity,
      status: 'processing'
    };
    orders.push(order);
    return res.status(201).send(order);
  }

  getOrders(req, res) {
    return res.send(orders);
  }
}

const ordersControllers = new OrdersControllers();
export default ordersControllers;
