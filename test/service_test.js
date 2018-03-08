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

var chai = require('chai');
var expect = chai.expect;
var mock = require('mock-require');
var customer = 1;

describe('service testing', function() {

    var NormalizeService;

    var all_fields = [
        {
            "id": 1,
            "customer": 1,
            "name": "profile",
            "path": "lead.fit_score"
        },
        {
            "id": 2,
            "customer": 1,
            "name": "role",
            "path": "lead.job_title"
        }
    ];
    var profile = 1;
    var role = 5;

    it('should return profile 1 when A and role 5 when Analista', function(done) {
        mock('../src/dao', {
            find_all_fields: function(customer, callback) {
                callback(all_fields);
            },
            find_field_config: function(field, value, callback) {
                if (field.id == 1) {
                    callback(profile);
                } else if (field.id == 2) {
                    callback(role);
                }
            }
        });
        NormalizeService = mock.reRequire('../src/NormalizeService');

        NormalizeService.prototype.normalize({
            'lead': {
                'fit_score': 'a',
                'job_title': 'Analista'
            }
        }, customer, function (normalized_data) {
            var normalized_data = JSON.stringify(normalized_data);
            expect(normalized_data).contains('"profile":1');
            expect(normalized_data).contains('"role":5');
            done();
        });
    });

});