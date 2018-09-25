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
    return res.status(200).send(orders);
  }

  getOrder(req, res) {
    const order = orders.find(f => f.id === parseInt(req.params.id, 10));
    if (!order) return res.status(404).send('order not found');
    return res.send(order);
  }

  updateOrderStatus(req, res) {
    const order = orders.find(f => f.id === parseInt(req.params.id, 10));
    if (!order) return res.status(404).json({ message: 'order not found' });

    order.status = req.body.status;
    return res.status(200).json(order);
  }

  deleteOrder(req, res) {
    const index = orders.indexOf();
    orders.splice(index, 1);
    return res.status(201).json({ message: 'order deleted successfully!' });
  }
}

const ordersControllers = new OrdersControllers();
export default ordersControllers;
