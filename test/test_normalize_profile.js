/*
 *
 * Copyright 2017 Softplan
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/

var sinon = require('sinon');
var proxyquire = require('proxyquire');
var supertest = require('supertest');
var chai = require('chai');
var expect = chai.expect;
var request_stub = sinon.stub();
var app = proxyquire('../app', {'request': request_stub});
var request = supertest(app);

describe('/normalize', function() {

    it('should return profile 1 when A', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'fit_score': 'a'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"profile":1');
                done();
            });
    });

    it('should return profile 2 when B', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'fit_score': 'b'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"profile":2');
                done();
            });
    });

    it('should return profile 3 when C', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'fit_score': 'c'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"profile":3');
                done();
            });
    });

    it('should return profile 4 when D', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'fit_score': 'd'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"profile":4');
                done();
            });
    });

});