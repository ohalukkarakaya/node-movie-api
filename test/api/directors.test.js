const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);
let token, testUsername, testPassword, directorId, movieId;

describe('/register create test user', () => {
  it(
    'create test user',
    (done) => {
      chai.request(server)
            .post('/register')
            .send({
                username: 'Test User',
                password: 'P@ssw0rd!234'
            }).end((err, res) => {
                testUsername = res.body.username;
                testPassword = 'P@ssw0rd!234'
                done();
            });
    }
  )
});

describe('api/directors tests', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({
                username: 'Test User',
                password: 'P@ssw0rd!234',
            }).end((err, res) => {
                token = res.body.token;
                console.log(token);
                done();
            });
    });

    describe('/POST a director', () => {
        it(
          'it should post a director',
          (done) => {
            const director = {
                name: 'Test',
                surname: 'Director',
                bio: "This is a test record, please don't touch if you see this",
            }

            chai.request(server)
                .post('/api/directors')
                .send(director)
                .set(
                    'x-access-token',
                    token
                ).end(
                    (err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('name');
                      res.body.should.have.property('surname');
                      res.body.should.have.property('bio');
                      res.body.should.have.property('createdAt');
                      directorId = res.body._id;
                      done();
                    }
                );
          }
        )
    })

    describe('/POST a movie for director', () => {
        it(
          'it should POST a movie',
          (done) => {
            const movie = {
                title: 'Test',
                director_id: directorId,
                category: 'Test',
                country: 'Test',
                year: 1998,
                imdb_score: 8,
            };

            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .set(
                  'x-access-token',
                  token
                ).end(
                  (err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    movieId = res.body._id;
                    done();
                  }
                 );
        });
    });

    describe('/GET directors', () => {
        it(
          'it should GET all the directors',
          (done) => {
            chai.request(server)
                .get('/api/directors')
                .set(
                  'x-access-token',
                  token
                ).end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  done();
                });
          }
        );
    });
    

    describe('/GET director by director_id', () => {
        it(
          'it should GET the test director by the given id',
          (done) => {
            chai.request(server)
                .get('/api/directors/'+ directorId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.includes.keys(['name', 'surname', 'bio', 'movies']);
                    res.body.movies.should.be.a('array');
                    res.body._id === directorId;
                    done();
                });
          }
        );
    });

    describe('/UPDATE director', () => {
        it(
          'it should UPDATE the test director',
          (done) => {
            const updatedDirector = {
                name: 'Test-update',
                surname: 'Director-update',
                bio: "Bio test update, please don't touch if you see this.",
            };

            chai.request(server)
                .put('/api/directors/'+ directorId)
                .send(updatedDirector)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql(updatedDirector.name);
                    res.body.should.have.property('surname').eql(updatedDirector.surname);
                    res.body.should.have.property('bio').eql(updatedDirector.bio);
                    res.body.should.have.property('_id').eql(directorId);
                    done();
                });
          }
        );
    });

    describe('/DELETE movie', () => {
        it(
          'it should DELETE movie',
          (done) => {
            chai.request(server)
                .delete('/api/movies/'+ movieId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(200);
                    res.body.should.have.property('message').eql("movie deleted");
                    done();
                });
          }
        );
    });

    describe('/DELETE director', () => {
        it(
          'it should DELETE director',
          (done) => {
            chai.request(server)
                .delete('/api/directors/'+ directorId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(true);
                    res.body.should.have.property('message').eql("Director Deleted");
                    done();
                });
          }
        );
    });

    describe('/DELETE test user', () => {
      it(
        'it should DELETE test user',
        (done) => {
          chai.request(server)
              .delete('/register')
              .send({
                username: testUsername,
                password: testPassword
              }).end((err, res) => {
                console.log(testPassword);
                  res.should.have.status(200);
                  res.body.should.have.property('status').eql(true);
                  res.body.should.have.property('message').eql("User Deleted");
                  done();
              });
        }
      );
  });
});