import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mock from './helper/mock';
import app from '../app';

chai.use(chaiHttp);


describe('Tests for User Authentication', () => {
  it('should return validation errors if no value is provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(mock.emptyUserRequest)
      .end((err, res) => {
        expect(res.body.error.firstname).to.equal('firstname is required');
        expect(res.body.error.lastname).to.equal('lastname is required');
        expect(res.body.error.username).to.equal('username is required');
        expect(res.body.error.address).to.equal('address is required');
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should return validation errors if invalid email or password is entered', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(mock.invalidUser)
      .end((err, res) => {
        expect(res.body.error.password).to.equal('Password must be greater than 6 characters');
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should return message if user account is created successfully', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(mock.newUser)
      .end((err, res) => {
        expect(res.body.message).to.equal('Account created');
        expect(res).to.have.status(201);
        done();
      });
  });

  it('should return error if username already exist', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(mock.sameUsernameUser)
      .end((err, res) => {
        expect(res.body.error).to.equal('User already exist');
        expect(res).to.have.status(409);
        done();
      });
  });

  it('should return error if email already exist', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(mock.sameEmailUser)
      .end((err, res) => {
        expect(res.body.error).to.equal('User already exist');
        expect(res).to.have.status(409);
        done();
      });
  });

  it('should return success message if user signin successfully', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send(mock.userLogin)
      .end((err, res) => {
        expect(res.body.message).to.equal('user login successful!');
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return error if user is not found when signing in', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send(mock.userNotFound)
      .end((err, res) => {
        expect(res.body.error).to.equal('user not found');
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return error if no email or password is entered', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send(mock.emptyLogin)
      .end((err, res) => {
        expect(res.body.error.email).to.equal('Email is required');
        expect(res.body.error.password).to.equal('Password is required');
        expect(res).to.have.status(400);
        done();
      });
  });
});
