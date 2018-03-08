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
var customer = require('./customer.json');

describe('/normalize concern', function() {

    it('should return concern 0 when was not set', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Qual sua maior preocupação hoje?' : ''
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"concern":0');
                done();
            });
    });

    it('should return concern 1 when Vender mais', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Qual sua maior preocupação hoje?' : 'Vender mais'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"concern":1');
                done();
            });
    });

    it('should return concern 2 when Conseguir crédito para a empresa', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Qual sua maior preocupação hoje?' : 'Conseguir crédito para a empresa'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"concern":2');
                done();
            });
    });

    it('should return concern 3 when Reduzir custos', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Qual sua maior preocupação hoje?' : 'Reduzir custos'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"concern":3');
                done();
            });
    });

    it('should return concern 4 when Organizar a empresa para poder crescer', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Qual sua maior preocupação hoje?' : 'Organizar a empresa para poder crescer'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"concern":4');
                done();
            });
    });

    it('should return concern 5 when Saber onde perco dinheiro', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Qual sua maior preocupação hoje?' : 'Saber onde perco dinheiro'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"concern":5');
                done();
            });
    });

});