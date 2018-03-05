// on test run set NODE_ENV to test
process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let User = require('../models/user');
let userController = require('../routes/users');

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

describe('/GET register page', () => {
  it('it should get the registration page', (done) => {
    chai.request(server)
    .get('/users/register')
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.a('object');
      done();
    });
  });
});

describe('/POST create new user', () => {
  it('it should add new user to the database', (done) => {
    let newUser = {
      fullname: "Martins Onuoha",
      username: "MartinsOnuoha",
      email: "martins@gmail.com",
      password: "codefalls"
    };
    
    chai.request(server)
    .post('/users/register')
    .send(newUser)
    .end((err, res) => {
      res.should.have.status(400);
      done();
    });
  });
});
