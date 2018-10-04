/* eslint-disable class-methods-use-this */
import orders from '../sampleData/ordersStorage';
import db from '../db/dbConnection';


class OrdersControllers {
  placeOrder(req, res) {
    const { body } = req;
    const name = body.meal.trim();
    const userId = body.userId.trim();
    const status = body.status.trim();
    const quantity = body.quantity.trim();
    const price = body.price.trim();

    const createOrder = 'INSERT INTO orders(meal, "userId", status, quantity, price) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const values = [name, userId, status, quantity, price];

    db.query(createOrder, values)
      .then(order => res.status(201).json({
        message: 'Order created successfully!',
        data: {
          name: order.rows[0].meal,
          status: order.rows[0].status,
          quantity: order.rows[0].quantity,
          price: order.rows[0].price
        }
      }))
      .catch(() => res.status(500).json({
        message: 'Internal server error'
      }));
  }

  getOrders(req, res) {
    return res.status(200).send(orders);
  }

  getOrder(req, res) {
    const order = orders.find(f => f.id === parseInt(req.params.id, 10));
    if (!order) res.status(404).send('order not found');
    return res.send(order);
  }

  updateOrderStatus(req, res) {
    const order = orders.find(f => f.id === parseInt(req.params.id, 10));
    if (!order) res.status(404).json({ message: 'order not found' });

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
