/* eslint-disable class-methods-use-this */
import db from '../db/dbConnection';


class MenuControllers {
  createMenu(req, res) {
    const { body } = req;
    const menuName = body.name.trim();
    const menuDesc = body.description.trim();
    const menuImage = body.image.trim();
    const menuPrice = body.price.trim();

    const query = 'INSERT INTO menu(name, description, image, price) VALUES($1, $2, $3, $4) RETURNING *';
    const values = [menuName, menuDesc, menuImage, menuPrice];

    db.query(query, values)
      .then(menu => res.status(201).json({
        status: 'success',
        message: 'menu created successfully!',
        data: {
          name: menu.rows[0].name,
          decription: menu.rows[0].description,
          image: menu.rows[0].image,
          price: menu.rows[0].price
        }
      }))
      .catch(() => res.status(500).json({
        status: 'fail',
        message: 'server error'
      }));
  }

  getMenu(req, res) {
    const query = 'SELECT * FROM menu';
    db.query(query)
      .then((menu) => {
        if (!menu.rows[0]) {
          return res.status(200).json({
            status: 'success',
            message: 'menu unavailable'
          });
        }

        return res.status(200).json({
          status: 'success',
          data: {
            items: menu.rows
          }
        });
      });
  }

  getMealById(req, res) {
    const { params } = req;
    const menuId = params.id;
    const query = 'SELECT * FROM menu WHERE id = $1';
    const values = [menuId];
    db.query(query, values)
      .then((menu) => {
        if (!menu.rows[0]) {
          return res.status(404).json({
            status: 'fail',
            message: 'Menu not found'
          });
        }

        return res.status(200).json({
          status: 'success',
          data: {
            item: menu.rows[0]
          }
        });
      });
  }

  updateMenu(req, res) {
    const mname = req.body.name;
    const mprice = req.body.price;
    const mdesc = req.body.description;
    const mimage = req.body.image;
    const menuId = req.params.id;
    const query = 'SELECT * FROM menu WHERE id = $1';
    const value = [menuId];
    const queryUpdateRequest = `UPDATE menu
     SET name = '${mname}', price = '${mprice}',
     description = '${mdesc}', image = '${mimage}' 
     WHERE id = '${menuId}'
     RETURNING *`;


    db.query(query, value)
      .then((checkOrder) => {
        if (!checkOrder.rows[0]) {
          return res.status(404).json({
            status: 'fail',
            message: 'Menu not found'
          });
        }
        db.query(queryUpdateRequest)
          .then(order => res.status(201).json({
            status: 'success',
            message: 'Menu updated successfully!',
            data: {
              items: order.rows
            }
          }))
          .catch(() => res.status(500).json({
            message: 'Server error'
          }));
      })
      .catch(() => res.status(500).json({
        message: 'Server error'
      }));
  }

  deleteMenu(req, res) {
    const menuId = req.params.id;
    const query = 'SELECT * FROM menu WHERE id = $1';
    const value = [menuId];
    const queryUpdateRequest = `DELETE FROM menu
     WHERE id = '${menuId}'`;


    db.query(query, value)
      .then((checkOrder) => {
        if (!checkOrder.rows[0]) {
          return res.status(404).json({
            status: 'fail',
            message: 'Menu not found'
          });
        }
        db.query(queryUpdateRequest)
          .then(() => res.status(201).json({
            status: 'success',
            message: 'Menu deleted successfully!',
          }))
          .catch(() => res.status(500).json({
            message: 'Server error'
          }));
      })
      .catch(() => res.status(500).json({
        message: 'Server error'
      }));
  }
}

const menuControllers = new MenuControllers();
export default menuControllers;
