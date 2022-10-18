const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);
let token, testUsername, testPassword, movieId;

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

describe('api/movies tests', () => {
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

    describe('/GET movies', () => {
        it(
          'it should GET all the movies',
          (done) => {
            chai.request(server)
                .get('/api/movies')
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

    describe('/POST movie', () => {
        it(
          'it should POST a movie',
          (done) => {
            const movie = {
                title: 'Test',
                director_id: '634c1084c7070431c4845f96',
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

    describe('/GET movie by movie_id', () => {
        it(
          'it should GET a movie by the given id',
          (done) => {
            chai.request(server)
                .get('/api/movies/'+ movieId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    res.body.should.have.property('_id').eql(movieId);
                    done();
                });
          }
        );
    });

    describe('/UPDATE movie', () => {
        it(
          'it should UPDATE a movie',
          (done) => {
            const updatedMovie = {
                title: 'Test-update',
                director_id: '634c1084c7070431c4845f96',
                category: 'Test-update',
                country: 'Test-update',
                year: 1998,
                imdb_score: 8,
            };

            chai.request(server)
                .put('/api/movies/'+ movieId)
                .send(updatedMovie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(updatedMovie.title);
                    res.body.should.have.property('director_id').eql(updatedMovie.director_id);
                    res.body.should.have.property('category').eql(updatedMovie.category);
                    res.body.should.have.property('country').eql(updatedMovie.country);
                    res.body.should.have.property('year').eql(updatedMovie.year);
                    res.body.should.have.property('imdb_score').eql(updatedMovie.imdb_score);
                    movieId = res.body._id;
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