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

describe('/normalize employees', function() {

    it('should return employees 0 when employees was not set', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Quantos funcionários há na sua empresa nas áreas de Engenharia, Compras, Financeiro, Administrativo e Comercial?' : ''
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"number_of_employees":0');
                done();
            });
    });

    it('should return employees 1 when 0 a 4', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Quantos funcionários há na sua empresa nas áreas de Engenharia, Compras, Financeiro, Administrativo e Comercial?' : '0 a 4'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"number_of_employees":1');
                done();
            });
    });

    it('should return employees 2 when 5 a 9', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Quantos funcionários há na sua empresa nas áreas de Engenharia, Compras, Financeiro, Administrativo e Comercial?' : '5 a 9'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"number_of_employees":2');
                done();
            });
    });

    it('should return employees 3 when 10 a 19', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Quantos funcionários há na sua empresa nas áreas de Engenharia, Compras, Financeiro, Administrativo e Comercial?' : '10 a 19'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"number_of_employees":3');
                done();
            });
    });

    it('should return employees 4 when 20 a 29', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Quantos funcionários há na sua empresa nas áreas de Engenharia, Compras, Financeiro, Administrativo e Comercial?' : '20 a 29'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"number_of_employees":4');
                done();
            });
    });

    it('should return employees 5 when 30 a 49', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Quantos funcionários há na sua empresa nas áreas de Engenharia, Compras, Financeiro, Administrativo e Comercial?' : '30 a 49'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"number_of_employees":5');
                done();
            });
    });

    it('should return employees 6 when 50 a 99', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Quantos funcionários há na sua empresa nas áreas de Engenharia, Compras, Financeiro, Administrativo e Comercial?' : '50 a 99'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"number_of_employees":6');
                done();
            });
    });

    it('should return employees 7 when 100 a 249', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Quantos funcionários há na sua empresa nas áreas de Engenharia, Compras, Financeiro, Administrativo e Comercial?' : '100 a 249'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"number_of_employees":7');
                done();
            });
    });

    it('should return employees 8 when 250 a 499', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Quantos funcionários há na sua empresa nas áreas de Engenharia, Compras, Financeiro, Administrativo e Comercial?' : '250 a 499'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"number_of_employees":8');
                done();
            });
    });

    it('should return employees 9 when 500 ou mais', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Quantos funcionários há na sua empresa nas áreas de Engenharia, Compras, Financeiro, Administrativo e Comercial?' : '500 ou mais'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"number_of_employees":9');
                done();
            });
    });



});
