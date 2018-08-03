const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const should = chai.should();

chai.use(chaiHttp);
// My parent block
describe('Diary', () => {
  /*
  * Test the /GET route
  */
  // const req = chai.request(app).get('/')
  describe('/GET /', () => {
    it('it should Reject default', (done) => {
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
    it('it should reject request without token', (done) => {
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
          res.body.should.have.property('status', 'success');
          res.body.entries.should.be.a('array');
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
            res.body.should.have.property('status', 'success');
            res.body.entry.should.be.a('array');
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
            res.should.have.status(404);
            res.type.should.equal('application/json');
            res.body.should.have.property('status', 'error');
            res.body.should.have.property('message', 'No entry found');
            done();
          });
      });
    });
  });

  describe('POST /entries', () => {
    /* it('it should create a new entry', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .post('/entries')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQxLCJpYXQiOjE1MzI2MDMzOTV9.3hHawOBmwPc3yQjf7k0dIlc2qACBkn04FgHq-w8hlDk')
        .send({ subject: 'foo for nothin', diary: 'bar is what is bad' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status', 'success');
          res.body.should.have.property('message', 'Entry saved successfully');
          done();
        });
    }); */
    it('it should reject the entry', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .post('/entries')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQxLCJpYXQiOjE1MzI2MDMzOTV9.3hHawOBmwPc3yQjf7k0dIlc2qACBkn04FgHq-w8hlDk')
        .send({ subject: 'foo' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'please provide all fields');
          done();
        });
    });
    it('it should reject the entry', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .post('/entries')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQxLCJpYXQiOjE1MzI2MDMzOTV9.3hHawOBmwPc3yQjf7k0dIlc2qACBkn04FgHq-w8hlDk')
        .send({ diary: 'bar' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'please provide all fields');
          done();
        });
    });
    it('it should reject the entry', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .post('/entries')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQxLCJpYXQiOjE1MzI2MDMzOTV9.3hHawOBmwPc3yQjf7k0dIlc2qACBkn04FgHq-w8hlDk')
        .send({ subject: 'foo', diary: '' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'please provide all fields');
          done();
        });
    });
    it('it should reject the entry', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .post('/entries')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQxLCJpYXQiOjE1MzI2MDMzOTV9.3hHawOBmwPc3yQjf7k0dIlc2qACBkn04FgHq-w8hlDk')
        .send({ subject: '', diary: 'bar' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'please provide all fields');
          done();
        });
    });
    it('it should reject the entry', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .post('/entries')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQxLCJpYXQiOjE1MzI2MDMzOTV9.3hHawOBmwPc3yQjf7k0dIlc2qACBkn04FgHq-w8hlDk')
        .send({ subject: ' ', diary: 'bar' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'please provide all fields');
          done();
        });
    });
    it('it should reject the entry', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .post('/entries')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQxLCJpYXQiOjE1MzI2MDMzOTV9.3hHawOBmwPc3yQjf7k0dIlc2qACBkn04FgHq-w8hlDk')
        .send({ subject: 'foo', diary: ' ' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'please provide all fields');
          done();
        });
    });
    it('it should reject the entry', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .post('/entries')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQxLCJpYXQiOjE1MzI2MDMzOTV9.3hHawOBmwPc3yQjf7k0dIlc2qACBkn04FgHq-w8hlDk')
        .send({ subject: ' ', diary: ' ' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'please provide all fields');
          done();
        });
    });
  });

  describe('PUT /entries/<entryId>', () => {
    it('it should reject the entry', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .put('/entries/1')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQxLCJpYXQiOjE1MzI2MDMzOTV9.3hHawOBmwPc3yQjf7k0dIlc2qACBkn04FgHq-w8hlDk')
        .send({ subject: 'foo update', diary: 'bar update' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'It\'s too late to update this');
          done();
        });
    });
    it('it should reject the entry update', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .put('/entries/1')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQxLCJpYXQiOjE1MzI2MDMzOTV9.3hHawOBmwPc3yQjf7k0dIlc2qACBkn04FgHq-w8hlDk')
        .send({ subject: 'foo' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'provide all fields');
          done();
        });
    });
    it('it should reject the entry update', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .put('/entries/1')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQxLCJpYXQiOjE1MzI2MDMzOTV9.3hHawOBmwPc3yQjf7k0dIlc2qACBkn04FgHq-w8hlDk')
        .send({ diary: 'bar' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'provide all fields');
          done();
        });
    });
    it('it should reject the entry update', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .put('/entries/1')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQxLCJpYXQiOjE1MzI2MDMzOTV9.3hHawOBmwPc3yQjf7k0dIlc2qACBkn04FgHq-w8hlDk')
        .send({ subject: 'foo', diary: '' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'provide all fields');
          done();
        });
    });
    it('it should reject the entry update', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .put('/entries/1')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQxLCJpYXQiOjE1MzI2MDMzOTV9.3hHawOBmwPc3yQjf7k0dIlc2qACBkn04FgHq-w8hlDk')
        .send({ subject: '', diary: 'bar' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'provide all fields');
          done();
        });
    });
    it('it should reject the entry update', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .put('/entries/1')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQxLCJpYXQiOjE1MzI2MDMzOTV9.3hHawOBmwPc3yQjf7k0dIlc2qACBkn04FgHq-w8hlDk')
        .send({ subject: ' ', diary: 'bar' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'provide all fields');
          done();
        });
    });
    it('it should reject the entry update', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .put('/entries/1')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQxLCJpYXQiOjE1MzI2MDMzOTV9.3hHawOBmwPc3yQjf7k0dIlc2qACBkn04FgHq-w8hlDk')
        .send({ subject: 'foo', diary: ' ' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'provide all fields');
          done();
        });
    });
    it('it should reject the entry update', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .put('/entries/1')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQxLCJpYXQiOjE1MzI2MDMzOTV9.3hHawOBmwPc3yQjf7k0dIlc2qACBkn04FgHq-w8hlDk')
        .send({ subject: ' ', diary: ' ' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'provide all fields');
          done();
        });
    });
    ['200', '201', '202', '203', '204'].forEach((userId) => {
      it(`it should reject invalid entryId ${userId}`, (done) => {
        chai.request('http://localhost:3000/api/v1')
          .put(`/entries/${userId}`)
          .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQxLCJpYXQiOjE1MzI2MDMzOTV9.3hHawOBmwPc3yQjf7k0dIlc2qACBkn04FgHq-w8hlDk')
          .send({ subject: 'foo update', diary: 'bar update' })
          .end((err, res) => {
            res.should.have.status(404);
            res.type.should.equal('application/json');
            res.body.should.have.property('status', 'error');
            res.body.should.have.property('message', 'Invalid Id');
            done();
          });
      });
    });
  });
});
