import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';


chai.use(chaiHttp);
let adminToken;

describe('Tests for Orders API endpoints', () => {
  it('should return success message if user signin successfully', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        role: 'admin',
        name: 'peter',
        email: 'peter@mail.com',
        password: 'fastadmin'
      })
      .end((err, res) => {
        adminToken = res.body.data.token;
        expect(res.body.message).to.equal('Signed in successfully');
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should place an order', (done) => {
    chai.request(app)
      .post('/api/v1/orders')
      .set('Content-Type', 'application/json')
      .set('x-access-token', adminToken)
      .send({
        meal: 'Jollof Rice',
        status: 'new',
        userId: '1',
        quantity: '3',
        price: '2000'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Order created successfully!');
        done();
      });
  });

  it('should return message if order history for a particular user is not found', (done) => {
    chai.request(app)
      .post('/api/v1/users/1/orders')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should update an order', (done) => {
    chai.request(app)
      .put('/api/v1/orders/1')
      .set('Content-Type', 'application/json')
      .set('x-access-token', adminToken)
      .send({
        meal: 'Jollof Rice',
        status: 'new',
        userId: '1',
        quantity: '3',
        price: '2000'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Order updated successfully!');
        done();
      });
  });


  it('should return error if no field to be updated is provided', (done) => {
    chai.request(app)
      .put('/api/v1/orders/1')
      .set('Content-Type', 'application/json')
      .set('x-access-token', adminToken)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should get all orders', (done) => {
    chai.request(app)
      .get('/api/v1/orders')
      .set('Content-Type', 'application/json')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should get an order', (done) => {
    chai.request(app)
      .get('/api/v1/orders/1')
      .set('Content-Type', 'application/json')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });


  it('should return errors if fields to place an order are not filled', (done) => {
    chai.request(app)
      .post('/api/v1/orders/')
      .set('Content-Type', 'application/json')
      .set('x-access-token', adminToken)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error.meal).to.equal('meal is required');
        done();
      });
  });


  it('should return error if order to be updated is not found', (done) => {
    chai.request(app)
      .put('/api/v1/orders/50')
      .set('Content-Type', 'application/json')
      .set('x-access-token', adminToken)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('order not found');
        done();
      });
  });
});
