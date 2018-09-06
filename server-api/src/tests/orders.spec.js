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
});
