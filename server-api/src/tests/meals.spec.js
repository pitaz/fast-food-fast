import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mock from './helper/mock';
import app from '../app';


chai.use(chaiHttp);


let mealId;


describe('Tests for meals API endpoints', () => {
  it('should return error if api endpoint does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/meals/clo/abount')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('page not found');
        done();
      });
  });

  it('should add a meal', (done) => {
    chai.request(app)
      .post('/api/v1/meals')
      .set('Content-Type', 'application/json')
      .send(mock.createMeal)
      .end((err, res) => {
        mealId = res.body.id;
        expect(res).to.have.status(201);
        expect(res.body.name).to.equal('Oha soup and pounded yam');
        done();
      });
  });

  it('should get all meals', (done) => {
    chai.request(app)
      .get('/api/v1/meals')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body[0].name).to.equal('Jollof rice and chicken');
        done();
      });
  });
});
