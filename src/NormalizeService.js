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
        dao.find_all_fields_join_configs(customer, function (fields) {
            let normalized_data = {};
            for (var i = 0; i < fields.length; i++) {
                let field = fields[i];
                let value = self.getProperty(data, field.path);
                let number_value;
                if (value) {
                    if (field.type == 'config' && field.configs) {
                        let configs = field.configs;
                        for (var j = 0; j < configs.length; j++) {
                            let config = configs[j];
                            if ((config.value_operator == 'eq' && config.value == value) ||
                                (config.value_operator == 'like' && value.indexOf(config.value) != -1)) {
                                number_value = config.number_value;
                            }
                        }
                    } else if (field.type == 'raw') {
                        number_value = parseInt(value);
                    }
                }
                if (!number_value) {
                    number_value = field.default_number_value;
                }
                normalized_data[field.name] = number_value;
            }
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
