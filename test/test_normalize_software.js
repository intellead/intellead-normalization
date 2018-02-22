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

describe('/normalize looking_for_a_software', function() {

    it('should return looking_for_a_software 9 when was not set', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'last_conversion': {
                        'content' : {
                            'Estou a procura de um software de gestão para minha empresa!' : ''
                        }
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"looking_for_a_software":9');
                done();
            });
    });

    it('should return looking_for_a_software 0 when Não', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'last_conversion': {
                        'content' : {
                            'Estou a procura de um software de gestão para minha empresa!' : 'Não'
                        }
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"looking_for_a_software":0');
                done();
            });
    });

    it('should return looking_for_a_software 1 when Sim', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'last_conversion': {
                        'content' : {
                            'Estou a procura de um software de gestão para minha empresa!' : 'Sim'
                        }
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"looking_for_a_software":1');
                done();
            });
    });

});