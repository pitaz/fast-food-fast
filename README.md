[![Build Status](https://travis-ci.org/pitaz/fast-food-fast.svg?branch=develop)](https://travis-ci.org/pitaz/fast-food-fast)
[![Maintainability](https://api.codeclimate.com/v1/badges/c69084a3494d3e2a376b/maintainability)](https://codeclimate.com/github/pitaz/fast-food-fast/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/pitaz/fast-food-fast/badge.svg)](https://coveralls.io/github/pitaz/fast-food-fast)

## Fast-food-fast
Fast-Food-Fast is a food delivery service app that provide users with the ability to place orders for food online.

# Features
* Users can create an new account and access the platform
* Logged in users are able to order meals.
* The admin is able to; 
    * Add, edit or delete the fast-food items
    * See a list of fast-food items
    * See a list of orders
    * Accept and decline orders
    * Mark orders as completed
* A user who is signed in is able to see a history of ordered food.

## Technologies used

* Front-end: HTML, CSS and Javascript
* Back-end: Expressjs
* Libraries: Babel, eslint, Mocha/Chai + chai-http
* System Dependencies: Node


<h3>API Endpoints</h3>
<hr>
<table>
  <tr>
      <th>Request</th>
      <th>End Point</th>
      <th>Action</th>
  </tr>
    <tr>
      <td>POST</td>
      <td>/api/v1/meals</td>
      <td>Add a meal</td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>/api/v1/meals/:id</td>
    <td>Update meal option</td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>/api/v1/meals/:id</td>
    <td>Remove a meal</td>
  </tr>

  <tr>
    <td>POST</td>
    <td>/api/v1/orders</td>
    <td>Place order</td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>/api/v1/orders/:id</td>
    <td>Change order status</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/v1/orders</td>
    <td>List of all orders</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/v1/auth/signup</td>
    <td>User signup</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/v1/auth/login</td>
    <td>User Login</td>
  </tr>
</table>

### Author(s)

* [Peter Odekwo Akpoghene](https://github.com/pitaz)
