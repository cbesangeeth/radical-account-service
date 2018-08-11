'use strict';

const expect  = require('chai').expect,
    assert    = require('chai').assert,
    supertest = require('supertest'),
    _         = require('lodash'),
    cfg       = require(`${__dirname}/../../../../config`),
    url       = cfg.baseurl + ':' + cfg.api.port,
    api       = supertest(`${url}`),
    dummyData = require('../../../data'),
    hello  = dummyData.global.starterMsg;

    describe('#hello-world', () => {
        it('should get hello in response', (done) => {

            api
            .get('/')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                expect(res.body).to.include.keys('status', 'errors', 'data');
                expect(res.body.status).to.be.a('number');
                expect(res.body.errors).to.be.a('object');
                expect(res.body.data).to.be.a('object');

                expect(res.body.data).to.include.keys(hello);
                expect(res.body.data.hello).to.include.keys('hi', 'to');
                expect(res.body.data.hello.hi).to.be.a('string');
                expect(res.body.data.hello.to).to.be.a('string');
                expect(res.body.data.hello.hi).to.equal('Welcome,');
                expect(res.body.data.hello.to).to.equal('radical-service !');
                expect(res.body.errors).to.deep.equal({});

                expect(res.body.status).to.equal(200);
                done();
            });
        });
    });
