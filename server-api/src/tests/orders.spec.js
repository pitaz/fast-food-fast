import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';


chai.use(chaiHttp);


describe('Tests for Orders API endpoints', () => {
  it('should place an order', (done) => {
    chai.request(app)
      .post('/api/v1/orders')
      .set('Content-Type', 'application/json')
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

  it('should return message if order for a particular user is not found', (done) => {
    chai.request(app)
      .post('/api/v1/1/orders')
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
      .send({
        id: '1',
        meal: 'Jollof Rice with chicken',
        quantity: '3',
        userId: '1',
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
      .put('/api/v1/orders/1')
      .set('Content-Type', 'application/json')
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should get all orders', (done) => {
    chai.request(app)
      .get('/api/v1/orders')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should get an order', (done) => {
    chai.request(app)
      .get('/api/v1/orders/1')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should delete an order', (done) => {
    chai.request(app)
      .delete('/api/v1/orders/1')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('order deleted successfully!');
        done();
      });
  });

  it('should return errors if fields to place an order are not filled', (done) => {
    chai.request(app)
      .post('/api/v1/orders/')
      .set('Content-Type', 'application/json')
      .send()
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error.meal).to.equal('Enter a meal');
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

  it('should return error if order to be deleted is not found', (done) => {
    chai.request(app)
      .delete('/api/v1/orders/50')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('order not found');
        done();
      });
  });
});
