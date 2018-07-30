const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../build/app');
const should = chai.should();

chai.use(chaiHttp);
// My parent block
describe('Diary', () => {
// user test cases
  describe('/GET api/v1/auth/signup', () => {
    it('it should save user account information', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .post('/auth/signup')
        .send({ subject: 'foo', diary: 'bar' })
        .end((err, res) => {
          res.should.have.status(200);
          res.type.should.equal('application/json');
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          done();
        });
    });
  });

  describe('/GET api/v1/auth/login', () => {
    it('it should reject login', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .post('/auth/login')
        .send({ email: 'wrong@gmail.com', password: '1234567' })
        .end((err, res) => {
          res.should.have.status(406);
          res.type.should.equal('application/json');
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          done();
        });
    });
  });

  describe('/GET api/v1/auth/login', () => {
    it('it should reject login', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .post('/auth/login')
        .send({ email: 'young@gmail.com', password: '123457' })
        .end((err, res) => {
          res.should.have.status(406);
          res.type.should.equal('application/json');
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          done();
        });
    });
  });

  describe('/GET api/v1/auth/login', () => {
    it('it should login user successfuly', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .post('/auth/login')
        .send({ email: 'young@gmail.com', password: '1234567' })
        .end((err, res) => {
          res.should.have.status(200);
          res.type.should.equal('application/json');
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          done();
        });
    });
  });
})