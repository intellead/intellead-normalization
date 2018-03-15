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

const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/postgres' || process.env.DATABASE_URL);
const Op = Sequelize.Op;

var Field;
var FieldConfig;

module.exports = {

    connect: function() {
        sequelize
            .authenticate()
            .then(function() {
                console.log('Connection has been established successfully.');
            })
            .catch(function(err) {
                console.error('Unable to connect to the database:', err);
            });

        Field = sequelize.define('field', {
            id: {
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            customer: {
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            path: {
                type: Sequelize.STRING
            },
            type: {
                type: Sequelize.STRING
            },
            default_number_value: {
                type: Sequelize.INTEGER
            }
        });
        FieldConfig = sequelize.define('fieldconfig', {
            id: {
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            field_id: {
                type: Sequelize.INTEGER
            },
            value: {
                type: Sequelize.STRING
            },
            number_value: {
                type: Sequelize.INTEGER
            },
            value_operator: {
                type: Sequelize.STRING
            }
        });

        Field.sync();
        FieldConfig.sync();
    },

    find_all_fields: function (customer, callback) {
        Field.findAll().then(fields => callback(fields));
    },

    find_field_config: function (field, value, callback) {
        FieldConfig.findAll({
            where: {
                id: field.id
            }
        }).then(configs => {
            for (var i = 0; i < configs.length; i++) {
                var config = configs[i];
                if ((config.value_operator == 'eq' && config.value == value) ||
                    (config.value_operator == 'like' && value.indexOf(config.value) != -1)) {
                    return callback(config.number_value);
                }
            }
            return callback(field.default_number_value);
        });
    },

    close: function() {
        sequelize.close();
    }

};