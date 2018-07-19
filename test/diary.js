const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../build/app');
const { expect } = chai.expect;
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

  describe('/GET api/v1/entries', () => {
    it('it should GET all the diaries', (done) => {
      chai.request('http://localhost:3000/api/v1')
        .get('/entries')
        .end((err, res) => {
          res.should.have.status(200);
          res.type.should.equal('application/json');
          done();
        });
    });
  });
});
