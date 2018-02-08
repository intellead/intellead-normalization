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

describe('/normalize segment', function() {

    it('should return segment 0 when was not set', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Segmento' : ''
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"company_segment":0');
                done();
            });
    });

    it('should return segment 1 when Construtora', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Segmento' : 'Construtora'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"company_segment":1');
                done();
            });
    });

    it('should return segment 2 when Construtora e Incorporadora', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Segmento' : 'Construtora e Incorporadora'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"company_segment":2');
                done();
            });
    });

    it('should return segment 3 when Incorporadora', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Segmento' : 'Incorporadora'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"company_segment":3');
                done();
            });
    });

    it('should return segment 4 when Instaladora', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Segmento' : 'Instaladora'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"company_segment":4');
                done();
            });
    });

    it('should return segment 5 when Loteadora', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Segmento' : 'Loteadora'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"company_segment":5');
                done();
            });
    });

    it('should return segment 6 when Obras Próprias', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Segmento' : 'Obras Próprias'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"company_segment":6');
                done();
            });
    });

    it('should return segment 7 when Reformas', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Segmento' : 'Reformas'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"company_segment":7');
                done();
            });
    });

    it('should return segment 8 when Serviços', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Segmento' : 'Serviços'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"company_segment":8');
                done();
            });
    });

    it('should return segment 9 when Serviços Especiais', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Segmento' : 'Serviços Especiais'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"company_segment":9');
                done();
            });
    });

    it('should return segment 10 when Outros', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Segmento' : 'Outros'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"company_segment":10');
                done();
            });
    });

});