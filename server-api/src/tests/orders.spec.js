import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mock from './helper/mock';
import app from '../app';


chai.use(chaiHttp);


let orderId;


describe('Tests for Orders API endpoints', () => {
  it('should place an order', (done) => {
    chai.request(app)
      .post('/api/v1/orders')
      .set('Content-Type', 'application/json')
      .send(mock.placeOrder)
      .end((err, res) => {
        orderId = res.body.id;
        expect(res).to.have.status(201);
        expect(res.body.meal).to.equal('Jollof Rice with grilled chicken');
        done();
      });
  });

  it('should return errors if fields to place an order are not filled', (done) => {
    chai.request(app)
      .post('/api/v1/orders/')
      .set('Content-Type', 'application/json')
      .send({
        meal: '',
        quantity: ''
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error.meal).to.equal('Enter a meal');
        done();
      });
  });

  it('should get all orders', (done) => {
    chai.request(app)
      .get('/api/v1/orders')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body[0].meal).to.equal('Jollof Rice with grilled chicken');
        done();
      });
  });

  it('should update an order', (done) => {
    chai.request(app)
      .put(`/api/v1/orders/${orderId}`)
      .set('Content-Type', 'application/json')
      .send({
        id: '1',
        meal: 'Jollof Rice with chicken',
        quantity: '3',
        status: 'completed'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('completed');
        done();
      });
  });


  it('should return error if no field to be updated is provided', (done) => {
    chai.request(app)
      .put(`/api/v1/orders/${orderId}`)
      .set('Content-Type', 'application/json')
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error.message).to.equal('Enter a field to update');
        done();
      });
  });


  it('should get an order', (done) => {
    chai.request(app)
      .get('/api/v1/orders/1')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.meal).to.equal('Jollof Rice with grilled chicken');
        done();
      });
  });


  it('should return errors if fields to place an order are not filled', (done) => {
    chai.request(app)
      .post('/api/v1/orders/')
      .set('Content-Type', 'application/json')
      .send({
        meal: '',
        quantity: ''
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error.meal).to.equal('Enter a meal');
        done();
      });
  });

  it('should return errors if fields to be updated are not filled ', (done) => {
    chai.request(app)
      .put('/api/v1/orders/1')
      .set('Content-Type', 'application/json')
      .send({
        meal: '',
        quantity: ''
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });


  it('should return error if orders to be updated is not found', (done) => {
    chai.request(app)
      .put('/api/v1/orders/50')
      .set('Content-Type', 'application/json')
      .send({
        meal: 'Oha',
        price: '2000'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('order not found');
        done();
      });
  });
});
