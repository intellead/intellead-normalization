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

describe('/normalize area', function() {

    it('should return lead_area 0 when area was not set', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Área' : ''
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"lead_area":0');
                done();
            });
    });

    it('should return lead_area 1 when Arquitetura', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Área' : 'Arquitetura'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"lead_area":1');
                done();
            });
    });

    it('should return lead_area 2 when Comercial', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Área' : 'Comercial'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"lead_area":2');
                done();
            });
    });

    it('should return lead_area 3 when Diretoria', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Área' : 'Diretoria'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"lead_area":3');
                done();
            });
    });

    it('should return lead_area 4 when Engenharia', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Área' : 'Engenharia'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"lead_area":4');
                done();
            });
    });

    it('should return lead_area 5 when Financeiro e Administrativo', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Área' : 'Financeiro e Administrativo'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"lead_area":5');
                done();
            });
    });

    it('should return lead_area 6 when Incorporação', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Área' : 'Incorporação'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"lead_area":6');
                done();
            });
    });

    it('should return lead_area 7 when Orçamento', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Área' : 'Orçamento'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"lead_area":7');
                done();
            });
    });

    it('should return lead_area 8 when Planejamento', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Área' : 'Planejamento'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"lead_area":8');
                done();
            });
    });

    it('should return lead_area 9 when RH', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Área' : 'RH'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"lead_area":9');
                done();
            });
    });

    it('should return lead_area 9 when rh', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Área' : 'rh'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"lead_area":9');
                done();
            });
    });

    it('should return lead_area 10 when TI', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Área' : 'TI'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"lead_area":10');
                done();
            });
    });

    it('should return lead_area 10 when ti', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Área' : 'ti'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"lead_area":10');
                done();
            });
    });

    it('should return lead_area 11 when Suprimentos', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Área' : 'Suprimentos'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"lead_area":11');
                done();
            });
    });

    it('should return lead_area 12 when Outros', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Área' : 'Outros'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"lead_area":12');
                done();
            });
    });

    it('should return lead_area 12 when outros', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Área' : 'outros'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"lead_area":12');
                done();
            });
    });

    it('should return lead_area 13 when Contabilidade', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'custom_fields': {
                        'Área' : 'Contabilidade'
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"lead_area":13');
                done();
            });
    });

});