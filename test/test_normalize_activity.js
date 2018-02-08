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

describe('/normalize activity', function() {

    it('should return main_activity 0 when was not set', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': ''
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":0');
                done();
            });
    });

    it('should return main_activity 1 when 43.99-1-99', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '43.99-1-99'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":1');
                done();
            });
    });

    it('should return main_activity 2 when 74.90-1-99', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '74.90-1-99'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":2');
                done();
            });
    });

    it('should return main_activity 3 when 43.30-4-01', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '43.30-4-01'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":3');
                done();
            });
    });

    it('should return main_activity 4 when 42.13-8-00', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '42.13-8-00'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":4');
                done();
            });
    });

    it('should return main_activity 5 when 69.20-6-01', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '69.20-6-01'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":5');
                done();
            });
    });

    it('should return main_activity 6 when 82.19-9-99', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '82.19-9-99'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":6');
                done();
            });
    });

    it('should return main_activity 7 when 68.21-8-01', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '68.21-8-01'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":7');
                done();
            });
    });

    it('should return main_activity 8 when 42.21-9-02', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '42.21-9-02'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":8');
                done();
            });
    });

    it('should return main_activity 9 when 68.22-6-00', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '68.22-6-00'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":9');
                done();
            });
    });

    it('should return main_activity 10 when 68.10-2-02', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '68.10-2-02'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":10');
                done();
            });
    });

    it('should return main_activity 11 when 42.92-8-02', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '42.92-8-02'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":11');
                done();
            });
    });

    it('should return main_activity 12 when 71.19-7-03', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '71.19-7-03'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":12');
                done();
            });
    });

    it('should return main_activity 13 when 43.30-4-04', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '43.30-4-04'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":13');
                done();
            });
    });

    it('should return main_activity 14 when 42.22-7-01', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '42.22-7-01'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":14');
                done();
            });
    });

    it('should return main_activity 15 when 42.99-5-01', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '42.99-5-01'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":15');
                done();
            });
    });

    it('should return main_activity 16 when 23.30-3-01', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '23.30-3-01'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":16');
                done();
            });
    });

    it('should return main_activity 17 when 42.21-9-03', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '42.21-9-03'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":17');
                done();
            });
    });

    it('should return main_activity 18 when 25.11-0-00', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '25.11-0-00'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":18');
                done();
            });
    });

    it('should return main_activity 19 when 68.10-2-03', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '68.10-2-03'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":19');
                done();
            });
    });

    it('should return main_activity 20 when 43.13-4-00', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '43.13-4-00'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":20');
                done();
            });
    });

    it('should return main_activity 21 when 68.10-2-01', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '68.10-2-01'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":21');
                done();
            });
    });

    it('should return main_activity 22 when 43.21-5-00', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '43.21-5-00'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":22');
                done();
            });
    });

    it('should return main_activity 23 when 43.30-4-99', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '43.30-4-99'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":23');
                done();
            });
    });

    it('should return main_activity 24 when 71.11-1-00', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '71.11-1-00'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":24');
                done();
            });
    });

    it('should return main_activity 25 when 42.99-5-99', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '42.99-5-99'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":25');
                done();
            });
    });

    it('should return main_activity 26 when 43.99-1-01', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '43.99-1-01'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":26');
                done();
            });
    });

    it('should return main_activity 27 when 43.99-1-03', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '43.99-1-03'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":27');
                done();
            });
    });

    it('should return main_activity 28 when 42.11-1-01', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '42.11-1-01'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":28');
                done();
            });
    });

    it('should return main_activity 29 when 71.12-0-00', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '71.12-0-00'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":29');
                done();
            });
    });

    it('should return main_activity 30 when 41.10-7-00', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '41.10-7-00'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":30');
                done();
            });
    });

    it('should return main_activity 31 when 41.20-4-00', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '41.20-4-00'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":31');
                done();
            });
    });

    it('should return main_activity 999 when 99.99-9-99', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, null);
        request
            .post('/normalize/1')
            .send({
                'lead': {
                    'main_activity_code': '99.99-9-99'
                }
            })
            .end(function (err, res) {
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).contains('"main_activity":999');
                done();
            });
    });

});