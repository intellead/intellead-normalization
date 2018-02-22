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

describe('/normalize wip', function() {

    it('should return wip 0 when was not set', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Sua empresa tem obras em andamento?' : ''
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"wip":0');
                done();
            });
    });

    it('should return wip 1 when Não, nenhuma', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Sua empresa tem obras em andamento?' : 'Não, nenhuma'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"wip":1');
                done();
            });
    });

    it('should return wip 2 when Sim, pequenas reformas', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Sua empresa tem obras em andamento?' : 'Sim, pequenas reformas'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"wip":2');
                done();
            });
    });

    it('should return wip 3 when Sim, até 3 obras', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Sua empresa tem obras em andamento?' : 'Sim, até 3 obras'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"wip":3');
                done();
            });
    });

    it('should return wip 4 when Sim, de 4 a 10 obras', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Sua empresa tem obras em andamento?' : 'Sim, de 4 a 10 obras'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"wip":4');
                done();
            });
    });

    it('should return wip 5 when Sim, mais de 11 obras', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Sua empresa tem obras em andamento?' : 'Sim, mais de 11 obras'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"wip":5');
                done();
            });
    });

});