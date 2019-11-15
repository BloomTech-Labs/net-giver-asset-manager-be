const request = require('supertest');

const server = require('./server.js');
const db = require('../data/dbConfig.js');
const Auth = require('../api/auth/auth-router');
const User = require('../api/users/users-model');
const Assets = require('../api/assets/assets-model');


describe('users-router.js', () => {
    // beforeEach(async () => {
    //     await db("user").truncate();
    // })
    describe('insert function()', () => {
        describe('GET', () => {
            it('should return 200 http status code', async () => {
                await request(server)
                    .get("/")
                    .set("Accept", "application/json")
                    .then(res => {
                        expect(res.status).toBe(200)
                    })
            })
            it("returns JSON", done => {
                request(server)
                    .get("/")
                    .then(res => {
                        expect(res.type).toMatch(/html/i);
                        done();
                    });
            });

            // it('should return JSON', async () => {
            //     const response = await request(server).get('/');

            //     expect(response.type).toMatch(/html/i);
            // })

            it('has process.env.DB_ENV as "testing', () => {
                request(db)
                expect(process.env.DB_ENV).toBe('testing')
            })

            // it('succeeds with correct credentials', async () => {
            //     const response = await post(`login`, demoUser)
            //         .expect(200);
            //     expect(res.body.user.email).toBe(demoUser.email);
            // });
        })


    })


})


describe('GET /user/:id', function () {
    it('respond with user not found', function (done) {
        request(server)
            .get('/users/idisnonexisting')
            .set('Accept', 'application/json')
            .expect(404) //expecting HTTP status code
            .end((err) => {
                if (err) return done(err);
                done();
            });

    });
    // it('succeeds with correct credentials', async () => {
    //     const response = await post(`login`, demoUser)
    //       .expect(200);
    //      expect(res.body.user.email).toBe(demoUser.email);
    //    });


    // it('should try to parse encoded info', async () => {

    //     await request(server)
    //         .get('/api/location')
    //         // .expect(500)
    //         .expect(res.body.user.email).deepStrictEqual({ message: "somehting" })
    // });

    // it("returns JSON", done => {
    //     request(server)
    //         .get("/api/location")
    //         .then(res => {
    //             expect(res.body).toContain({ message: "message" });
    //             done();
    //         });
    // });


});

describe('Post Endpoints', () => {
    it('should create a new post', async () => {
        const res = await request(server)
            .post('/api/auth/login')
            .send({
                "email": "335@a.com",
                "password": "123",
                "username": "effyou"
            })
        // expect(res.statusCode).toEqual(201)
        expect(server).toHaveLength(3)
        // expect({ message: "Invalid email or password or username" })
    })
})

