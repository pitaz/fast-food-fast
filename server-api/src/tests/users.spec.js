import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mock from './helper/mock';
import app from '../app';

chai.use(chaiHttp);


describe('Tests for User Signin/signup', () => {
  it('should return validation errors if no value is provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send({})
      .end((err, res) => {
        expect(res.body.error.name).to.equal('name is required');
        expect(res.body.error.email).to.equal('email is required');
        expect(res.body.error.role).to.equal('role is required');
        expect(res.body.error.password).to.equal('password is required');
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should return validation errors if invalid email or password is entered', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send({
        role: 'user',
        name: 'piro',
        email: 'usermail.com',
        password: 'pas'
      })
      .end((err, res) => {
        expect(res.body.error.email).to.equal('Email is invalid');
        expect(res.body.error.password).to.equal('Password must be greater than 6 characters');
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should return success message if user was successfully created', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send({
        role: 'user',
        name: 'piro',
        email: 'user8@mail.com',
        password: 'password'
      })
      .end((err, res) => {
        expect(res.body.message).to.equal('User created successfully!');
        expect(res).to.have.status(201);
        done();
      });
  });

  it('should return error if email already exist', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send({
        role: 'user',
        name: 'piro',
        email: 'peter@mail.com',
        password: 'password'
      })
      .end((err, res) => {
        expect(res.body.message).to.equal('Email already exist!');
        expect(res).to.have.status(409);
        done();
      });
  });

  it('should return error if email already exist', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send({
        role: 'user',
        name: 'piro',
        email: 'peter@mail.com',
        password: 'password'
      })
      .end((err, res) => {
        expect(res.body.message).to.equal('Email already exist!');
        expect(res).to.have.status(409);
        done();
      });
  });

  it('should return success message if user signin successfully', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        role: 'user',
        name: 'piro',
        email: 'user8@mail.com',
        password: 'password'
      })
      .end((err, res) => {
        expect(res.body.message).to.equal('Sign in successfully');
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return error if password is entered incorrectly', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        role: 'user',
        name: 'piro',
        email: 'peter@mail.com',
        password: 'password'
      })
      .end((err, res) => {
        expect(res.body.message).to.equal('Wrong password entered');
        expect(res).to.have.status(422);
        done();
      });
  });

  it('should return error if invalid email or password length is entered', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send(mock.invalidUserLogin)
      .end((err, res) => {
        expect(res.body.error.email).to.equal('Email is invalid');
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should return error if no email or password is entered', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send()
      .end((err, res) => {
        expect(res.body.error.email).to.equal('Email is required');
        expect(res.body.error.password).to.equal('Password is required');
        expect(res).to.have.status(400);
        done();
      });
  });
});
