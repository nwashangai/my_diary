const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../build/app');
const should = chai.should();

chai.use(chaiHttp);
// My parent block
describe('Diary', () => {
  /*
  * Test the /GET route
  */
  // const req = chai.request(app).get('/')
  describe('/GET /', () => {
    it('it should GET all the diaries', (done) => {
      chai.request('http://localhost:3000')
        .get('/')
        .end((err, res) => {
          res.should.have.status(404);
          res.type.should.equal('application/json');
          res.body.should.have.property('error');
          done();
        });
    });
  });

  describe('/GET api/v1/', () => {
    it('it should GET all the diaries', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .get('/')
        .end((err, res) => {
          res.should.have.status(404);
          res.type.should.equal('application/json');
          res.body.should.have.property('error');
          done();
        });
    });
  });

  describe('/GET api/v1/entries', () => {
    it('it should GET all the diaries', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .get('/entries')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQxLCJpYXQiOjE1MzI2MDMzOTV9.3hHawOBmwPc3yQjf7k0dIlc2qACBkn04FgHq-w8hlDk')
        .end((err, res) => {
          res.should.have.status(200);
          res.type.should.equal('application/json');
          res.body.should.have.property('status');
          res.body.should.have.property('entries');
          done();
        });
    });
  });

  describe('GET /entries/<entryId>', () => {
    ['1', '2'].forEach((userId) => {
      it(`it should GET A single entry with given id ${userId}`, (done) => {
        chai.request('http://localhost:3000/api/v1')
          .get(`/entries/${userId}`)
          .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQxLCJpYXQiOjE1MzI2MDMzOTV9.3hHawOBmwPc3yQjf7k0dIlc2qACBkn04FgHq-w8hlDk')
          .end((err, res) => {
            res.should.have.status(200);
            res.type.should.equal('application/json');
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            done();
          });
      });
    });
  });

  describe('GET /entries/<WrongEntryId>', () => {
    ['200', '201', '202', '203', '204'].forEach((userId) => {
      it(`it should GET A single entry with given id ${userId}`, (done) => {
        chai.request('http://localhost:3000/api/v1')
          .get(`/entries/${userId}`)
          .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQxLCJpYXQiOjE1MzI2MDMzOTV9.3hHawOBmwPc3yQjf7k0dIlc2qACBkn04FgHq-w8hlDk')
          .end((err, res) => {
            res.should.have.status(200);
            res.type.should.equal('application/json');
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            done();
          });
      });
    });
  });

  describe('POST /entries', () => {
    it('it should create a new entry', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .post('/entries')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQxLCJpYXQiOjE1MzI2MDMzOTV9.3hHawOBmwPc3yQjf7k0dIlc2qACBkn04FgHq-w8hlDk')
        .send({ subject: 'foo', diary: 'bar' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          done();
        });
    });
    it('it should reject the entry', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .post('/entries')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQxLCJpYXQiOjE1MzI2MDMzOTV9.3hHawOBmwPc3yQjf7k0dIlc2qACBkn04FgHq-w8hlDk')
        .send({ subject: 'foo' })
        .end((err, res) => {
          res.should.have.status(406);
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          done();
        });
    });
    it('it should reject the entry', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .post('/entries')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQxLCJpYXQiOjE1MzI2MDMzOTV9.3hHawOBmwPc3yQjf7k0dIlc2qACBkn04FgHq-w8hlDk')
        .send({ diary: 'bar' })
        .end((err, res) => {
          res.should.have.status(406);
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          done();
        });
    });
    it('it should reject the entry', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .post('/entries')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQxLCJpYXQiOjE1MzI2MDMzOTV9.3hHawOBmwPc3yQjf7k0dIlc2qACBkn04FgHq-w8hlDk')
        .send({ subject: 'foo', diary: '' })
        .end((err, res) => {
          res.should.have.status(406);
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          done();
        });
    });
    it('it should reject the entry', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .post('/entries')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQxLCJpYXQiOjE1MzI2MDMzOTV9.3hHawOBmwPc3yQjf7k0dIlc2qACBkn04FgHq-w8hlDk')
        .send({ subject: '', diary: 'bar' })
        .end((err, res) => {
          res.should.have.status(406);
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          done();
        });
    });
    it('it should reject the entry', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .post('/entries')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQxLCJpYXQiOjE1MzI2MDMzOTV9.3hHawOBmwPc3yQjf7k0dIlc2qACBkn04FgHq-w8hlDk')
        .send({ subject: ' ', diary: 'bar' })
        .end((err, res) => {
          res.should.have.status(406);
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          done();
        });
    });
    it('it should reject the entry', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .post('/entries')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQxLCJpYXQiOjE1MzI2MDMzOTV9.3hHawOBmwPc3yQjf7k0dIlc2qACBkn04FgHq-w8hlDk')
        .send({ subject: 'foo', diary: ' ' })
        .end((err, res) => {
          res.should.have.status(406);
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          done();
        });
    });
    it('it should reject the entry', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .post('/entries')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQxLCJpYXQiOjE1MzI2MDMzOTV9.3hHawOBmwPc3yQjf7k0dIlc2qACBkn04FgHq-w8hlDk')
        .send({ subject: ' ', diary: ' ' })
        .end((err, res) => {
          res.should.have.status(406);
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          done();
        });
    });
  });

  /* describe('PUT /entries/<entryId>', () => {
    it('it should update a single entry', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .put('/entries/1')
        .send({ subject: 'foo update', diary: 'bar update' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status');
          res.body.should.have.property('entry');
          done();
        });
    });
    it('it should reject the entry update', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .put('/entries/1')
        .send({ subject: 'foo' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          done();
        });
    });
    it('it should reject the entry update', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .put('/entries/1')
        .send({ diary: 'bar' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          done();
        });
    });
    it('it should reject the entry update', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .put('/entries/1')
        .send({ subject: 'foo', diary: '' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          done();
        });
    });
    it('it should reject the entry update', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .put('/entries/1')
        .send({ subject: '', diary: 'bar' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          done();
        });
    });
    it('it should reject the entry update', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .put('/entries/1')
        .send({ subject: ' ', diary: 'bar' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          done();
        });
    });
    it('it should reject the entry update', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .put('/entries/1')
        .send({ subject: 'foo', diary: ' ' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          done();
        });
    });
    it('it should reject the entry update', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .put('/entries/1')
        .send({ subject: ' ', diary: ' ' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          done();
        });
    });
    ['200', '201', '202', '203', '204'].forEach((userId) => {
      it(`it should reject invalid entryId ${userId}`, (done) => {
        chai.request('http://localhost:3000/api/v1')
          .put(`/entries/${userId}`)
          .send({ subject: 'foo update', diary: 'bar update' })
          .end((err, res) => {
            res.should.have.status(200);
            res.type.should.equal('application/json');
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            done();
          });
      });
    });
  }); */
});
