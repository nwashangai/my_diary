const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const should = chai.should();

chai.use(chaiHttp);
// My parent block
describe('Diary', () => {
// user test cases
  describe('/GET api/v1/auth/signup', () => {
    it('it should reject invalid user account information', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .post('/auth/signup')
        .send({ subject: 'foo', diary: 'bar' })
        .end((err, res) => {
          res.should.have.status(400);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'sorry please provide all fields');
          done();
        });
    });
  });
  describe('/GET api/v1/auth/signup', () => {
    it('it should save user account information', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .post('/auth/signup')
        .send({ full_name: 'foo', email: 'bar', password: 'bar' })
        .end((err, res) => {
          res.should.have.status(400);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'sorry please provide all fields');
          done();
        });
    });
  });

  describe('/GET api/v1/auth/signup', () => {
    it('it should save user account information', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .post('/auth/signup')
        .send({ full_name: 'young Nwadike', email: 'young@gmail.com', password: 'foo bar' })
        .end((err, res) => {
          res.should.have.status(400);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'sorry please provide all fields');
          done();
        });
    });
  });

  describe('/GET api/v1/auth/signup', () => {
    it('it should save user account information', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .post('/auth/signup')
        .send({ full_name: 'young Nwadike', email: 'young@gmail.com', password: 'foobar' })
        .end((err, res) => {
          res.should.have.status(409);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'duplicate email address');
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
          res.should.have.status(403);
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
          res.should.have.status(403);
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