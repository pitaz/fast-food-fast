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

  getUserOrders(req, res) {
    const { params } = req;
    const userId = params.id;

    const query = 'SELECT * FROM orders WHERE "userId" = $1';
    const value = [userId];

    db.query(query, value)
      .then((order) => {
        if (!order.rows[0]) {
          return res.status(404).json({
            message: 'order not found'
          });
        }

        return res.status(200).json({
          message: `Order for user with id ${userId}`,
          data: {
            name: order.rows[0].meal,
            status: order.rows[0].status,
            quantity: order.rows[0].quantity,
            price: order.rows[0].price
          }
        });
      });
  }

  getOrders(req, res) {
    const query = 'SELECT * FROM orders';
    db.query(query)
      .then((order) => {
        if (!order.rows[0]) {
          return res.status(404).json({
            message: 'order not found'
          });
        }

        return res.status(200).json({
          data: {
            name: order.rows[0].meal,
            status: order.rows[0].status,
            quantity: order.rows[0].quantity,
            price: order.rows[0].price
          }
        });
      });
  }

  getOrder(req, res) {
    const { params } = req;
    const orderId = params.id;
    const query = 'SELECT * FROM orders WHERE id = $1';
    const values = [orderId];
    db.query(query, values)
      .then((order) => {
        if (!order.rows[0]) {
          return res.status(404).json({
            message: 'order not found'
          });
        }

        return res.status(200).json({
          data: {
            name: order.rows[0].meal,
            status: order.rows[0].status,
            quantity: order.rows[0].quantity,
            price: order.rows[0].price
          }
        });
      });
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
