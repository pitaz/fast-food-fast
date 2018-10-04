/* eslint-disable class-methods-use-this */
import meals from '../sampleData/mealsStorage';
import db from '../db/dbConnection';


class MealsControllers {
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
        message: 'menu created successfully!',
        data: {
          name: menu.rows[0].name,
          decription: menu.rows[0].description,
          image: menu.rows[0].image,
          price: menu.rows[0].price
        }
      }))
      .catch(() => res.status(500).json({
        message: 'server error'
      }));
  }

  getMenu(req, res) {
    const query = 'SELECT * FROM menu';
    db.query(query)
      .then((menu) => {
        if (!menu.rows[0]) {
          return res.status(404).json({
            message: 'menu unavailable'
          });
        }

        return res.status(200).json({
          data: {
            name: menu.rows[0].name,
            decription: menu.rows[0].desc,
            image: menu.rows[0].image,
            price: menu.rows[0].price
          }
        });
      });
  }

  getMealById(req, res) {
    const meal = meals.find(f => f.id === parseInt(req.params.id, 10));
    if (!meal) res.status(404).json({ message: 'Meal not found' });
    return res.status(200).send(meal);
  }

  updateMeal(req, res) {
    const meal = meals.find(f => f.id === parseInt(req.params.id, 10));
    if (!meal) res.status(404).json({ message: 'Meal not found' });
    meal.name = req.body.name;
    meal.desc = req.body.desc;
    meal.price = req.body.price;
    meal.image = req.body.image;
    return res.status(200).json(meal);
  }

  deleteMeal(req, res) {
    const index = meals.indexOf();
    meals.splice(index, 1);
    return res.status(201).json({ message: 'meal deleted successfully!' });
  }
}

const mealsControllers = new MealsControllers();
export default mealsControllers;
