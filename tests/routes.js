// on test run set NODE_ENV to test
process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let User = require('../models/user');

let chai = require('chai');
let should = chai.should();
let chaiHttp = require('chai-http');
let server = require('../app');

chai.use(chaiHttp);

// empty database before every test
describe('Users', () => {
  beforeEach((done) => {
    User.remove({}, (err) => {
      done();
    });
    
  });
  
});
// get home
describe('/GET home', () => {
  it('it return a 200 HTTP response', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        
        res.should.have.status(200);
        res.should.be.a('object');
        done();
        
      });
  });
});
// get login page
describe('/GET login page', () => {
  it('it should return a 200 HTTP response', (done) => {
    chai.request(server)
    .get('/users/login')
    .end((err, res) => {
      
      res.should.have.status(200);
      res.should.be.a('object');
      done();
    });
  });
});

// get notification route
describe('/GET registration', () => {
  it('it should return a 200 HTTP response', (done) => {
    chai.request(server)
    .get('/users/register')
    .end((err, res) => {
      
      res.should.have.status(200);
      res.should.be.a('object');
      done();
      
    });
  });
});
// manage tasks
describe('/GET manage tasks', () => {
  it('it should return a 200 HTTP response', (done) => {
    chai.request(server)
    .get('/dashboard/manage_tasks')
    .end((err, res) => {

      res.should.have.status(200);
      res.should.be.a('object');
      done();
    });
  });
});

// 404
describe('/GET 404 error', () => {
  it('it should return a 404 HTTP response', (done) => {
    chai.request(server)
    .get('/dashboard/manage_taskness')
    .end((err, res) => {

      res.should.have.status(404);
      res.should.be.a('object');
      done();
    });
  });
});
describe('/GET 404 error', () => {
  it('it should return a 404 HTTP response', (done) => {
    chai.request(server)
    .get('/dashboard/manage_butts')
    .end((err, res) => {

      res.should.have.status(404);
      res.should.be.a('object');
      done();
    });
  });
});

// capital route
describe('/GET capital route', () => {
  it('it should return a 200 HTTP response', (done) => {
    chai.request(server)
    .get('/dashboard/capital')
    .end((err, res) => {

      res.should.have.status(200);
      done();
    });
  });
});

// about route
describe('/GET about route', () => {
  it('it should return a 200 HTTP response', (done) => {
    chai.request(server)
    .get('/about')
    .end((err, res) => {

      res.should.have.status(200);
      done();
    });
  });
});

describe('/GET contact us route', () => {
  it('it should return a 200 HTTP response', (done) => {
    chai.request(server)
    .get('/contact_us')
    .end((err, res) => {

      res.should.have.status(200);
      res.should.be.a('object');
      done();
    });
  });
});
