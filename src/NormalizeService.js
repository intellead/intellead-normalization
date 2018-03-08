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

class NormalizeService {

    normalize(data, customer, callback) {
        var self = this;
        dao.connect();
        dao.find_all_fields(customer, function(fields) {
            var normalized_data = {};
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                var value = self.getProperty(data, field.path);
                if (value) {
                    dao.find_field_config(field, value, function(number_value) {
                        normalized_data[fields[i].name] = number_value;
                    });
                }
            }
            dao.close();
            callback(normalized_data);
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
