import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';


chai.use(chaiHttp);
let adminToken;

describe('Tests for menu API endpoints', () => {
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

  it('should return error if api endpoint does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/menu/any')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('page not found');
        done();
      });
  });

  it('should add a meal', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('Content-Type', 'application/json')
      .set('x-access-token', adminToken)
      .send({
        name: 'Oha soup and pounded yam',
        description: 'Soup',
        image: 'www.newimage.com',
        price: '2000'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('should get all menu', (done) => {
    chai.request(app)
      .get('/api/v1/menu')
      .set('Content-Type', 'application/json')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should get a meal option', (done) => {
    chai.request(app)
      .get('/api/v1/menu/1')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  // it('should return errors if fields to be updated are not filled ', (done) => {
  //   chai.request(app)
  //     .put('/api/v1/menu/1')
  //     .set('Content-Type', 'application/json')
  //     .send({
  //       name: '',
  //       desc: '',
  //       price: ''
  //     })
  //     .end((err, res) => {
  //       expect(res).to.have.status(400);
  //       // expect(res.body.error.name).to.equal('name is required');
  //       done();
  //     });
  // });

  it('should return error if price is not a number', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('Content-Type', 'application/json')
      .set('x-access-token', adminToken)
      .send({
        name: 'Oha soup and pounded yam',
        description: 'Soup',
        image: 'www.newimage.com',
        price: 'Two hundred'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error.price).to.equal('price must be a number');
        done();
      });
  });

  it('should return error if menu to be updated is not found', (done) => {
    chai.request(app)
      .put('/api/v1/menu/50')
      .set('Content-Type', 'application/json')
      .send({
        name: 'Oha soup and pounded yam',
        description: 'Soup',
        image: 'www.newimage.com',
        price: '2000',
        status: 'processing'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Meal not found');
        done();
      });
  });

  // it('should delete a meal option', (done) => {
  //   chai.request(app)
  //     .delete('/api/v1/menu/1')
  //     .set('Content-Type', 'application/json')
  //     .end((err, res) => {
  //       expect(res).to.have.status(201);
  //       expect(res.body.message).to.equal('meal deleted successfully!');
  //       done();
  //     });
  // });

  // it('should return error if meal to be deleted is not found', (done) => {
  //   chai.request(app)
  //     .delete('/api/v1/menu/50')
  //     .set('Content-Type', 'application/json')
  //     .end((err, res) => {
  //       expect(res).to.have.status(404);
  //       expect(res.body.message).to.equal('Meal not found');
  //       done();
  //     });
  // });
});
