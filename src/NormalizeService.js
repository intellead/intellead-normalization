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

var dao = require('./dao');
var Sync = require('sync');

class NormalizeService {

    normalize(data, customer, callback) {
        var self = this;
        dao.connect();
        dao.find_all_fields(customer, function (fields) {
            Sync(function () {
                var normalized_data = {};
                for (var i = 0; i < fields.length; i++) {
                    var field = fields[i];
                    var value = self.getProperty(data, field.path);
                    if (value) {
                        if (field.type == 'config') {
                            normalized_data[field.name] = dao.find_field_config.sync(null, field, value);
                        } else if (field.type == 'raw') {
                            normalized_data[field.name] = value;
                        }
                    } else {
                        normalized_data[field.name] = field.default_number_value;
                    }
                }
                dao.close();
                callback(normalized_data);
            });
        });
    }

    getProperty(obj, props, defaultValue) {
        var res, isvoid = function(x){return typeof x === "undefined" || x === null;};
        if(!isvoid(obj)){
            if(isvoid(props)) props = [];
            if(typeof props  === "string") props = props.trim().split(".");
            if(props.constructor === Array){
                res = props.length>1 ? this.getProperty(obj[props.shift()],props,defaultValue) : obj[props[0]];
            }
        }
        return typeof res === "undefined" ? defaultValue: res;
    }

}

module.exports = NormalizeService;
