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

describe('/normalize source', function() {

    it('should return source_first_conv 0 when was not set', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'first_conversion': {
                        'conversion_origin' : {
                            'source' : ''
                        }
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"source_first_conv":0');
                done();
            });
    });

    it('should return source_first_conv 0 when Desconhecido', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'first_conversion': {
                        'conversion_origin' : {
                            'source' : 'Desconhecido'
                        }
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"source_first_conv":0');
                done();
            });
    });

    it('should return source_first_conv 1 when Orgânica', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'first_conversion': {
                        'conversion_origin' : {
                            'source' : 'Orgânica'
                        }
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"source_first_conv":1');
                done();
            });
    });

    it('should return source_first_conv 1 when Google', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'first_conversion': {
                        'conversion_origin' : {
                            'source' : 'Google'
                        }
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"source_first_conv":1');
                done();
            });
    });

    it('should return source_first_conv 1 when google', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'first_conversion': {
                        'conversion_origin' : {
                            'source' : 'google'
                        }
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"source_first_conv":1');
                done();
            });
    });

    it('should return source_first_conv 2 when Paga', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'first_conversion': {
                        'conversion_origin' : {
                            'source' : 'Paga'
                        }
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"source_first_conv":2');
                done();
            });
    });

    it('should return source_first_conv 3 when Email', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'first_conversion': {
                        'conversion_origin' : {
                            'source' : 'Email'
                        }
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"source_first_conv":3');
                done();
            });
    });

    it('should return source_first_conv 4 when Outros', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'first_conversion': {
                        'conversion_origin' : {
                            'source' : 'Outros'
                        }
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"source_first_conv":4');
                done();
            });
    });

    it('should return source_first_conv 5 when Referência', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'first_conversion': {
                        'conversion_origin' : {
                            'source' : 'Referência'
                        }
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"source_first_conv":5');
                done();
            });
    });

    it('should return source_first_conv 6 when Social | Facebook', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'first_conversion': {
                        'conversion_origin' : {
                            'source' : 'Social | Facebook'
                        }
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"source_first_conv":6');
                done();
            });
    });

    it('should return source_first_conv 6 when Facebook Ads', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'first_conversion': {
                        'conversion_origin' : {
                            'source' : 'Facebook Ads'
                        }
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"source_first_conv":6');
                done();
            });
    });

    it('should return source_first_conv 6 when Facebook-Ads', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'first_conversion': {
                        'conversion_origin' : {
                            'source' : 'Facebook-Ads'
                        }
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"source_first_conv":6');
                done();
            });
    });

    it('should return source_first_conv 6 when Facebook-ads', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'first_conversion': {
                        'conversion_origin' : {
                            'source' : 'Facebook-ads'
                        }
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"source_first_conv":6');
                done();
            });
    });

    it('should return source_first_conv 7 when Social', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'first_conversion': {
                        'conversion_origin' : {
                            'source' : 'Social'
                        }
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"source_first_conv":7');
                done();
            });
    });

    it('should return source_first_conv 8 when Tráfego Direto', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'first_conversion': {
                        'conversion_origin' : {
                            'source' : 'Tráfego Direto'
                        }
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"source_first_conv":8');
                done();
            });
    });

    it('should return source_first_conv 8 when direct', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'first_conversion': {
                        'conversion_origin' : {
                            'source' : 'direct'
                        }
                    }
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"source_first_conv":8');
                done();
            });
    });

});