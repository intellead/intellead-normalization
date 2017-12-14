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
var databaseUrl = process.env.DATABASE_URL || 'postgres://localhost:5432/postgres';
const sequelize = new Sequelize(databaseUrl);

sequelize
    .authenticate()
    .then(function() {
        console.log('Connection has been established successfully.');
    })
    .catch(function(err) {
        console.error('Unable to connect to the database:', err);
    });