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

describe('service testing', function() {

    var NormalizeService;

    var all_fields = [
        {
            "id": 1,
            "customer": 1,
            "name": "profile",
            "path": "lead.fit_score",
            "type": "config",
            "default_number_value": 0,
            "configs": [
                {
                    "id": 1,
                    "field_id": 1,
                    "value": "a",
                    "number_value": 1,
                    "value_operator": "eq"
                }
            ]
        },
        {
            "id": 2,
            "customer": 1,
            "name": "role",
            "path": "lead.job_title",
            "type": "config",
            "default_number_value": 0,
            "configs": [
                {
                    "id": 2,
                    "field_id": 2,
                    "value": "Analista",
                    "number_value": 5,
                    "value_operator": "eq"
                }
            ]
        },
        {
            "id": 3,
            "customer": 1,
            "name": "conversion",
            "path": "lead.number_conversions",
            "type": "raw",
            "default_number_value": 0
        },
        {
            "id": 4,
            "customer": 1,
            "name": "company_segment",
            "path": "lead.custom_fields.Segmento",
            "type": "config",
            "default_number_value": 7
        }
    ];

    it('should return profile 1 when A and role 5 when Analista', function(done) {
        mock('../src/dao', {
            connect: function() {},
            find_all_fields_join_configs: function(customer, callback) {
                callback(all_fields);
            },
            find_field_configs: function(field, callback) {},
            close: function() {}
        });
        NormalizeService = mock.reRequire('../src/NormalizeService');

        NormalizeService.prototype.normalize({
            'lead': {
                'fit_score': 'a',
                'job_title': 'Analista',
                'number_conversions': 9,
                'custom_fields': {
                    'Segmento': 'segmento não existente'
                }
            }
        }, 1, function (normalized_data) {
            var normalized_data = JSON.stringify(normalized_data);
            expect(normalized_data).contains('"profile":1');
            expect(normalized_data).contains('"role":5');
            expect(normalized_data).contains('"conversion":9');
            expect(normalized_data).contains('"company_segment":7');
            done();
        });
    });

});