import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';

import fs from 'fs';

import app from '../../src/index.js';

describe('User APIs Test', () => {
    before((done) => {
        const clearCollections = () => {
            for (const collection in mongoose.connection.collections) {
                mongoose.connection.collections[collection].deleteOne(() => {});
            }
        };

        const mongooseConnect = async() => {
            await mongoose.connect(process.env.userDATABASE_TEST);
            clearCollections();
        };

        if (mongoose.connection.readyState === 0) {
            mongooseConnect();
        } else {
            clearCollections();
        }

        done();
    });

    const jsonFileUser = fs.readFileSync('tests/integration/user.json')
    const userData = JSON.parse(jsonFileUser);
    let jwtToken = '';
    let token = '';


    //register user test
    describe('POST /registration', () => {
        it('given new user when added should return status 201', (done) => {
            request(app)
                .post('/api/v1/users/registration')
                .send(userData.validRegistration)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
                    done();
                });
        });

        it('given user when not registered should return status 500', (done) => {
            request(app)
                .post('/api/v1/users/registration')
                .send(userData.invalidRegistration)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(HttpStatus.INTERNAL_SERVER_ERROR);
                    done();
                });
        });

        it('given user when provides empty details should return status 500', (done) => {
            request(app)
                .post('/api/v1/users/registration')
                .send(userData.emptyRegistration)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(HttpStatus.INTERNAL_SERVER_ERROR);
                    done();
                });
        });
    });

    // user login test
    describe('POST /login', () => {
        it('given user when logged in should return status 200', (done) => {
            request(app)
                .post('/api/v1/users/login')
                .send(userData.validLogin)
                .end((err, res) => {
                    jwtToken = res.body.data;
                    expect(res.statusCode).to.be.equal(HttpStatus.OK);
                    expect(res.body.data).to.be.not.null;
                    done();
                });
        });

        it('given uer when denied login should return status 401', (done) => {
            request(app)
                .post('/api/v1/users/login')
                .send(userData.invalidLogin)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(HttpStatus.UNAUTHORIZED);
                    done();
                });
        });
    });

    // forget password test
    describe('POST /forgerPassword', () => {
        it('given user when provides valid email should get mail should return status 200', (done) => {
            request(app)
                .post('/api/v1/users/forgetPassword')
                .send(userData.forgetPassword)
                .end((err, res) => {
                    token = res.body.data;
                    expect(res.statusCode).to.be.equal(HttpStatus.OK);
                    expect(err).to.not.exist;
                    done();
                });
        });

        it('given user when provides invalid email should return status 500', (done) => {
            request(app)
                .post('/api/v1/users/forgetPassword')
                .send(userData.invalidEmail)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(HttpStatus.INTERNAL_SERVER_ERROR);
                    done();
                });
        });
    });

    // reset password test
    describe('POST /resetPassword', () => {
        it('given user when able to reset password should return status 200', (done) => {
            request(app)
                .post('/api/v1/users/resetPassword/' + `${token}`)
                .send(userData.resetPassword)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(HttpStatus.OK);
                    done();
                });
        });
        it('given user when able not able to reset password should return status 404', (done) => {
            request(app)
                .post('/api/v1/users/resetPassword/')
                .send(userData.resetPassword)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(HttpStatus.NOT_FOUND);
                    done();
                });
        });
    });
});