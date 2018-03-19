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
var HTTPStatus = require('http-status');

describe('/normalize', function() {

    it('should return status code 412', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, '{"id": 1, "customer": 1, "name": "profile", "path": "lead.fit_score"}');
        request
            .post('/normalize')
            .set('token', '1')
            .end(function(err, res) {
                var statusCode = res.statusCode;
                expect(statusCode).to.equal(HTTPStatus.PRECONDITION_FAILED);
                done();
            });
    });

    it('should return status code 403', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 403}, '{"id": 1, "customer": 1, "name": "profile", "path": "lead.fit_score"}');
        request
            .post('/normalize')
            .set('token', '1')
            .end(function(err, res) {
                var statusCode = res.statusCode;
                expect(statusCode).to.equal(HTTPStatus.FORBIDDEN);
                done();
            });
    });

});