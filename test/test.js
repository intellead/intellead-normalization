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
var HTTPStatus = require('http-status');
var fs = require('fs');
var customer = require('./customer.json');

describe('/normalize', function() {

    it('should return status code 412', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .end(function(err, res) {
                var statusCode = res.statusCode;
                expect(statusCode).to.equal(HTTPStatus.PRECONDITION_FAILED);
                done();
            });
    });

    it('should return status code 403', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 403}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .end(function(err, res) {
                var statusCode = res.statusCode;
                expect(statusCode).to.equal(HTTPStatus.FORBIDDEN);
                done();
            });
    });

    it('should return status code 200 when normalize data', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'job_title': 'Sócio/Proprietário',
                    'fit_score': 'a',
                    'number_conversions': 1,
                    'custom_fields': {
                        'Área': 'Arquitetura',
                        'Quantos funcionários há na sua empresa nas áreas de Engenharia, Compras, Financeiro, Administrativo e Comercial?': '0 a 4',
                        'Segmento': 'Construtora',
                        'Sua empresa tem obras em andamento?': 'Não, nenhuma',
                        'Qual sua maior preocupação hoje?': 'Vender mais'
                    },
                    'first_conversion' : {
                        'conversion_origin': {
                            'source': 'Orgânica'
                        }
                    },
                    'last_conversion' : {
                        'conversion_origin': {
                            'source': 'Google'
                        },
                        'content': {
                            'Estou a procura de um software de gestão para minha empresa!': 'Sim'
                        }
                    },
                    'main_activity_code': '43.99-1-99'
                }
            })
            .end(function (err, res) {
                var statusCode = res.statusCode;
                expect(statusCode).to.equal(HTTPStatus.OK);
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).to.equal('{"role":1,"profile":1,"conversion":1,"lead_area":1,"number_of_employees":1,"company_segment":1,"wip":1,"source_first_conv":1,"source_last_conv":1,"concern":1,"looking_for_a_software":1,"main_activity":1}');
                done();
            });
    });

    it('should return status code 200 when normalize data from full lead', function(done) {
        request_stub.withArgs({url: 'http://intellead-security:8080/auth/1'}).yields(null, {'statusCode': 200}, customer);
        request
            .post('/normalize')
            .set('token', '1')
            .send({
                'lead': {
                    'email': 'jhon@silva.com',
                    'name': 'John Silva',
                    'company': 'Elitim',
                    'job_title': 'Assistente',
                    'bio': null,
                    'public_url': 'http://google.com',
                    'created_at': '2010-01-01T00:00:00.000-02:00',
                    'opportunity': 'false',
                    'number_conversions': '41',
                    'user': null,
                    'first_conversion': {
                        'content': {
                            'email_lead': 'jhon@silva.com',
                            'tags': 'PlanilhasXERP - A',
                            'created_at': '2010-01-01T02:00:00.000Z',
                            'identificador': 'Planilhas_x_ERP_-_Base',
                            'company_id': null,
                            'import_token': 'b91e6b31-a42e-4187'
                        },
                        'created_at': '2010-01-01T00:00:00.000-02:00',
                        'cumulative_sum': '1',
                        'source': 'Planilhas_x_ERP_-_Base',
                        'conversion_origin': {
                            'source': 'unknown',
                            'medium': 'unknown',
                            'value': null,
                            'campaign': 'unknown',
                            'channel': 'Unknown'
                        }
                    },
                    'last_conversion': {
                        'content': {
                            'identificador': '/ebooks/guia-do-pbqp-h/',
                            'nome': 'Jhon',
                            'empresa': 'Elitim ',
                            'cargo': 'Assistente',
                            'telefone': '(99) 9999-12345',
                            'Quer receber novidades': null,
                            'Empresa usa o Sienge?': null,
                            'Tem interesse em contratar ferramenta de gestão?': null,
                            'Porque se interessou pela palestra?': null,
                            'Qual é o principal desafio da sua empresa neste ano?': null,
                            'Usa o Sienge?': null,
                            'Como soube da Palestra': null,
                            'Empresa que Trabalha': null,
                            'Segmento': 'Construtora',
                            'Área': 'Outros',
                            'Sua empresa tem obras em andamento?': null,
                            'Qual sua maior preocupação hoje?': null,
                            'Como sua empresa é gerenciada?': null,
                            'O que sua empresa precisa?': null,
                            'Como as decisões são tomadas?': null,
                            'Costuma faltar material nas suas obras?': null,
                            'Você já ouviu falar do Sienge?': null,
                            'Qual área da sua empresa tem mais dificuldades?': null,
                            'Qual o impacto de uma semana de chuva em sua obra?': null,
                            'Sua empresa tem processos eficientes?': null,
                            'Possui verba para investir em software?': null,
                            'Sua obra possui acesso à internet?': null,
                            'Quantos funcionários há na sua empresa nas áreas de Engenharia, Compras, Financeiro, Administrativo e Comercial?': null,
                            'Alguma empresa indicou o Sienge para você?': null,
                            'Qual o problema você está tentando resolver na sua empresa?': null,
                            'Estado': null,
                            'Estado_Adicional': null,
                            'Cidade': null,
                            'Gostaria de receber um contato do consultor para avaliação da ferramenta?': null,
                            'Sim, eu gostaria de receber um contato do consultor para avaliação do software': null,
                            'Quero uma demonstração de um software de gestão para minha empresa!': null,
                            'Quero uma demonstração de um software de gestão para minha empresa! - Palestras': null,
                            'Quero uma demonstração de um software de gestão para minha empresa! - Planilhas e Ebooks': null,
                            'Condição de Pagamento': null,
                            'Estou a procura de um software de gestão para minha empresa!': 'Não',
                            'Pop up Demonstração': null,
                            'Cargo_complemento': null,
                            'Segmento_complemento': null,
                            'Area_complemento': null,
                            '¿Cuáles son tus mayores preocupaciones relacionadas con la empresa? ': null,
                            '¿Cómo funciona la gestión de su empresa?': null,
                            'Ahora ¿cuáles son sus mayores dificultades con su herramienta de gestión?': null,
                            'Falar com': '',
                            'Mensagem': null,
                            'Campaign_Source': '',
                            'Campaign_Name': '',
                            'Campaign_Medium': '',
                            'Campaign_Term': '',
                            'Campaign_Content': '',
                            'Frist_Visit': '',
                            'Previous_Visit': '',
                            'Current_visit_started': '',
                            'Times_visited': '',
                            'Pages_Viewed': '',
                            'traffic_source': 'encoded',
                            'created_at': '2017-09-09 16:55:21 UTC',
                            'email_lead': 'jhon@silva.com'
                        },
                        'created_at': '2017-09-09T13:55:21.000-03:00',
                        'cumulative_sum': '41',
                        'source': '/ebooks/guia-do-pbqp-h/',
                        'conversion_origin': {
                            'source': 'Email-Acao',
                            'medium': 'email',
                            'value': null,
                            'campaign': 'ebook-pbqp-h-24-08',
                            'channel': 'Email'
                        }
                    },
                    'custom_fields': {
                        'Campaign_Source': 'Email-Acao',
                        'Campaign_Medium': 'email',
                        'Frist_Visit': '05 Apr 2017 - 22:53',
                        'Previous_Visit': '08 Apr 2017 - 23:54',
                        'Current_visit_started': '27 Apr 2017 - 22:57',
                        'Times_visited': '15',
                        'Pages_Viewed': '5',
                        'Campaign_Name': 'dose-mensal-04-17',
                        'c_utmz': 'utmcsr=ExactSales|utmccn=(referral)|utmcmd=referral>>utmcsr=ExactSales|utmccn=(referral)|utmcmd=referral',
                        'Quer receber novidades': 'Sim',
                        'Empresa usa o Sienge?': 'Não',
                        'Segmento': 'Construtora',
                        'Área': 'Outros',
                        'Sim, eu gostaria de receber um contato do consultor para avaliação do software': '',
                        'Estou a procura de um software de gestão para minha empresa!': 'Não',
                        'Qual sua maior preocupação hoje?': 'Reduzir custos',
                        'Como sua empresa é gerenciada?': 'Usamos planilhas',
                        'Costuma faltar material nas suas obras?': 'De vez em quando falta',
                        'Qual o impacto de uma semana de chuva em sua obra?': 'Pequeno, planejamos atividades para que a equipe não fique parada',
                        'Sua empresa tem obras em andamento?': 'Sim, até 3 obras',
                        'Como as decisões são tomadas?': 'Meu gestor decide',
                        'Você já ouviu falar do Sienge?': 'Sim',
                        'Qual área da sua empresa tem mais dificuldades?': 'Obras',
                        'Sua empresa tem processos eficientes?': 'Não',
                        'Sua obra possui acesso à internet?': 'Rede Fixa (Cabo, Rádio, Wifi)',
                        'Possui verba para investir em software?': 'Não',
                        'Quantos funcionários há na sua empresa nas áreas de Engenharia, Compras, Financeiro, Administrativo e Comercial?': '10 a 19',
                        'Alguma empresa indicou o Sienge para você?': 'Não'
                    },
                    'website': null,
                    'personal_phone': '(99) 9999-12345',
                    'mobile_phone': null,
                    'city': null,
                    'state': null,
                    'tags': [
                        'planilhasxerp - a',
                        'fluxo-nutrição'
                    ],
                    'lead_stage': 'Lead',
                    'last_marked_opportunity_date': null,
                    'uuid': '5a0aa3fe-9fda-461e',
                    'fit_score': 'c',
                    'interest': 12,
                    'cnpj': '13.926.863/0001-36'
                }
            })
            .end(function (err, res) {
                var statusCode = res.statusCode;
                expect(statusCode).to.equal(HTTPStatus.OK);
                var normalized_data = JSON.stringify(res.body);
                expect(normalized_data).to.equal('{"role":6,"profile":3,"conversion":41,"lead_area":12,"number_of_employees":3,"company_segment":1,"wip":3,"source_first_conv":0,"source_last_conv":3,"concern":3,"looking_for_a_software":0,"main_activity":0}');
                done();
            });
    });

});