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

describe('/normalize role', function() {

    it('should return role 0 when job was not set', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': ''
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":0');
                done();
            });
    });

    it('should return role 1 when Sócio/Proprietário', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'Sócio/Proprietário'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":1');
                done();
            });
    });

    it('should return role 1 when sócio/proprietário', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'sócio/proprietário'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":1');
                done();
            });
    });

    it('should return role 1 when Sócio-proprietário', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'Sócio-proprietário'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":1');
                done();
            });
    });

    it('should return role 1 when Sócio Proprietário', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'Sócio Proprietário'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":1');
                done();
            });
    });

    it('should return role 2 when ADM', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'ADM'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":2');
                done();
            });
    });

    it('should return role 2 when adm', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'adm'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":2');
                done();
            });
    });

    it('should return role 3 when Aluno', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'Aluno'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":3');
                done();
            });
    });

    it('should return role 3 when Estudante', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'Estudante'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":3');
                done();
            });
    });

    it('should return role 4 when TI', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'TI'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":4');
                done();
            });
    });

    it('should return role 4 when ti', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'ti'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":4');
                done();
            });
    });

    it('should return role 4 when Gestor TI', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'Gestor TI'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":4');
                done();
            });
    });

    it('should return role 5 when Analista', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'Analista'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":5');
                done();
            });
    });

    it('should return role 5 when analista', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'analista'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":5');
                done();
            });
    });

    it('should return role 6 when Assistente', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'Assistente'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":6');
                done();
            });
    });

    it('should return role 6 when assistente', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'assistente'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":6');
                done();
            });
    });

    it('should return role 7 when Autônomo', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'Autônomo'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":7');
                done();
            });
    });

    it('should return role 7 when autônomo', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'autônomo'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":7');
                done();
            });
    });

    it('should return role 8 when Consultor', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'Consultor'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":8');
                done();
            });
    });

    it('should return role 8 when consultor', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'consultor'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":8');
                done();
            });
    });

    it('should return role 9 when Coordenador de obras', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'Coordenador de obras'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":9');
                done();
            });
    });

    it('should return role 10 when Diretor', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'Diretor'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":10');
                done();
            });
    });

    it('should return role 10 when diretor', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'diretor'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":10');
                done();
            });
    });

    it('should return role 11 when Engeenheiro e proprietário', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'Engeenheiro e proprietário'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":11');
                done();
            });
    });

    it('should return role 12 when Departamento financeiro', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'Departamento financeiro'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":12');
                done();
            });
    });

    it('should return role 13 when Estagiário', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'Estagiário'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":13');
                done();
            });
    });

    it('should return role 13 when estagiário', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'estagiário'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":13');
                done();
            });
    });

    it('should return role 14 when Gerente administrativo', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'Gerente administrativo'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":14');
                done();
            });
    });

    it('should return role 15 when Gerente financeiro', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'Gerente financeiro'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":15');
                done();
            });
    });

    it('should return role 16 when Gerente geral', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'Gerente geral'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":16');
                done();
            });
    });

    it('should return role 17 when Gestor de área', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'Gestor de área'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":17');
                done();
            });
    });

    it('should return role 17 when gestor de área', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'gestor_de_área'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":17');
                done();
            });
    });

    it('should return role 17 when Gestor de Área', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'Gestor de Área'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":17');
                done();
            });
    });

    it('should return role 18 when Gerente de planejamento', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'Gerente de planejamento'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":18');
                done();
            });
    });

    it('should return role 19 when Outros', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'Outros'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":19');
                done();
            });
    });

    it('should return role 19 when outros', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'outros'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":19');
                done();
            });
    });

    it('should return role 20 when Proprietário', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'Proprietário'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":20');
                done();
            });
    });

    it('should return role 21 when Sócio', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'Sócio'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":21');
                done();
            });
    });

    it('should return role 22 when Sócio financeiro e administrativo', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'job_title': 'Sócio financeiro e administrativo'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"role":22');
                done();
            });
    });

});