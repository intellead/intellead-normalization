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

var Sync = require('sync');
const Sequelize = require('sequelize');
var sequelize;
var Field;
var FieldConfig;

module.exports = {

    connect: function() {
        sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:postgres@intellead-normalization-postgresql:5432/postgres');

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

    find_all_fields_join_configs: function (customer, callback) {
        var self = this;
        Sync(function() {
            let fields = self.find_fields.sync(null, customer);
            for (var i = 0; i < fields.length; i++) {
                fields[i].configs = self.find_field_configs.sync(null, fields[i]);
            }
            callback(fields);
        });
    },

    find_fields: function(customer, callback) {
        Field.findAll({
            where: {
                customer: customer
            }
        }).then(fields => {
            return callback(null, fields);
        })
    },

    find_field_configs: function (field, callback) {
        FieldConfig.findAll({
            where: {
                field_id: field.id
            }
        }).then(configs => {
            return callback(null, configs);
        });
    },

    close: function() {
        sequelize.close();
    },

};