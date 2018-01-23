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

var _ = require('lodash');

module.exports = {

    lead: function(data) {
        var normalized_data = {
            role: job_title(getProperty(data, 'lead.job_title', 0)),
            profile: lead_profile(data.lead.fit_score),
            conversion: parseInt(getProperty(data, 'lead.number_conversions', 0)),
            lead_area: area(getProperty(data, 'lead.custom_fields.Área', 0)),
            number_of_employees: number_of_employees_in_office(getProperty(data, 'lead.custom_fields.Quantos funcionários há na sua empresa nas áreas de Engenharia, Compras, Financeiro, Administrativo e Comercial?', 0)),
            company_segment: segment(getProperty(data, 'lead.custom_fields.Segmento', 0)),
            wip: works_in_progress(getProperty(data, 'lead.custom_fields.Sua empresa tem obras em andamento?', 0)),
            source_first_conv: source_of_convertion(getProperty(data, 'lead.first_conversion.conversion_origin.source', 0)),
            source_last_conv: source_of_convertion(getProperty(data, 'lead.last_conversion.conversion_origin.source', 0)),
            concern: biggest_concern(getProperty(data, 'lead.custom_fields.Qual sua maior preocupação hoje?', 0)),
            looking_for_a_software: looking_for_a_management_software(getProperty(data, 'lead.last_conversion.content.Estou a procura de um software de gestão para minha empresa!', 9)),
            main_activity: cnae(getProperty(data, 'lead.main_activity_code', 0))
        };
        return normalized_data;
    }

};

function job_title(data) {
    if (!data || data == '') {
        return 0;
    }
    if (data == 'Sócio/Proprietário' || data == 'sócio/proprietário' || data == 'Sócio-proprietário' || data == 'Sócio Proprietário') {
        return 1;
    }
    if (data == 'ADM' || data == 'adm') {
        return 2;
    }
    if (data == 'Aluno' || data == 'Estudante') {
        return 3;
    }
    if (data == 'TI' || data == 'ti' || data == 'Gestor TI') {
        return 4;
    }
    if (data == 'Analista' || data == 'analista') {
        return 5;
    }
    if (data == 'Assistente' || data == 'assistente') {
        return 6;
    }
    if (data == 'Autônomo' || data == 'autônomo') {
        return 7;
    }
    if (data == 'Consultor' || data == 'consultor') {
        return 8;
    }
    if (data == 'Coordenador de obras') {
        return 9;
    }
    if (data == 'Diretor' || data == 'diretor') {
        return 10;
    }
    if (data == 'Engeenheiro e proprietário') {
        return 11;
    }
    if (data == 'Departamento financeiro') {
        return 12;
    }
    if (data == 'Estagiário' || data == 'estagiário') {
        return 13;
    }
    if (data == 'Gerente administrativo') {
        return 14;
    }
    if (data == 'Gerente financeiro') {
        return 15;
    }
    if (data == 'Gerente geral') {
        return 16;
    }
    if (data == 'Gestor de área' || data == 'gestor_de_área' || data == 'Gestor de Área') {
        return 17;
    }
    if (data == 'Gerente de planejamento') {
        return 18;
    }
    if (data == 'Outros' || data == 'outros') {
        return 19;
    }
    if (data == 'Proprietário') {
        return 20;
    }
    if (data == 'Sócio') {
        return 21;
    }
    if (data == 'Sócio financeiro e administrativo') {
        return 22;
    }
}

function lead_profile(data) {
    if (data == 'a') {
        return 1;
    }
    if (data == 'b') {
        return 2;
    }
    if (data == 'c') {
        return 3;
    }
    if (data == 'd') {
        return 4;
    }
}

function area(data) {
    if (!data || data == '') {
        return 0;
    }
    if (data == 'Arquitetura') {
        return 1;
    }
    if (data == 'Comercial') {
        return 2;
    }
    if (data == 'Diretoria') {
        return 3;
    }
    if (data == 'Engenharia') {
        return 4;
    }
    if (data == 'Financeiro e Administrativo') {
        return 5;
    }
    if (data == 'Incorporação') {
        return 6;
    }
    if (data == 'Orçamento') {
        return 7;
    }
    if (data == 'Planejamento') {
        return 8;
    }
    if (data == 'RH' || data == 'rh') {
        return 9;
    }
    if (data == 'TI' || data == 'ti') {
        return 10;
    }
    if (data == 'Suprimentos') {
        return 11;
    }
    if (data == 'Outros' || data == 'outros') {
        return 12;
    }
    if (data == 'Contabilidade') {
        return 13;
    }
}

function number_of_employees_in_office(data) {
    if (!data || data == '') {
        return 0;
    }
    if (data == '0 a 4') {
        return 1;
    }
    if (data == '5 a 9') {
        return 2;
    }
    if (data == '10 a 19') {
        return 3;
    }
    if (data == '20 a 29') {
        return 4;
    }
    if (data == '30 a 49') {
        return 5;
    }
    if (data == '50 a 99') {
        return 6;
    }
    if (data == '100 a 249') {
        return 7;
    }
    if (data == '250 a 499') {
        return 8;
    }
    if (data == '500 ou mais') {
        return 9;
    }
}

function segment(data) {
    if (!data || data == '') {
        return 0;
    }
    if (data == 'Construtora') {
        return 1;
    }
    if (data == 'Construtora e Incorporadora') {
        return 2;
    }
    if (data == 'Incorporadora') {
        return 3;
    }
    if (data == 'Instaladora') {
        return 4;
    }
    if (data == 'Loteadora') {
        return 5;
    }
    if (data == 'Obras Próprias') {
        return 6;
    }
    if (data == 'Reformas') {
        return 7;
    }
    if (data == 'Serviços') {
        return 8;
    }
    if (data == 'Serviços Especiais') {
        return 9;
    }
    if (data == 'Outros') {
        return 10;
    }
}

function works_in_progress(data) {
    if (!data || data == '') {
        return 0;
    }
    if (data == 'Não, nenhuma') {
        return 1;
    }
    if (data == 'Sim, pequenas reformas') {
        return 2;
    }
    if (data == 'Sim, até 3 obras') {
        return 3;
    }
    if (data == 'Sim, de 4 a 10 obras') {
        return 4;
    }
    if (data == 'Sim, mais de 11 obras') {
        return 5;
    }
}

function source_of_convertion(data) {
    if (!data || data == '' || data == 'Desconhecido' || data == 'unknown') {
        return 0;
    }
    if (data.indexOf('Orgânica') != -1 || data == 'Google' || data == 'google') {
        return 1;
    }
    if (data.indexOf('Paga') != -1) {
        return 2;
    }
    if (data.indexOf('Email') != -1) {
        return 3;
    }
    if (data.indexOf('Outros') != -1) {
        return 4;
    }
    if (data.indexOf('Referência') != -1) {
        return 5;
    }
    if (data.indexOf('Social | Facebook') != -1 || data.indexOf('Facebook Ads') != -1 || data == 'Facebook-Ads' || data == 'Facebook-ads') {
        return 6;
    }
    if (data.indexOf('Social') != -1) {
        return 7;
    }
    if (data == 'Tráfego Direto' || data.indexOf('direct') != -1) {
        return 8;
    }
}

function biggest_concern(data) {
    if (!data || data == '') {
        return 0;
    }
    if (data == 'Vender mais') {
        return 1;
    }
    if (data == 'Conseguir crédito para a empresa') {
        return 2;
    }
    if (data == 'Reduzir custos') {
        return 3;
    }
    if (data == 'Organizar a empresa para poder crescer') {
        return 4;
    }
    if (data == 'Saber onde perco dinheiro') {
        return 5;
    }
}

function looking_for_a_management_software(data) {
    if (!data || data == '') {
        return 9;
    }
    if (data == 'Não') {
        return 0;
    }
    if (data == 'Sim') {
        return 1;
    }
}

function cnae(data) {
    if (!data || data == '') {
        return 0;
    }
    if (data =='43.99-1-99') {
        return 1;
    }
    if (data == '74.90-1-99') {
        return 2;
    }
    if (data == '43.30-4-01') {
        return 3;
    }
    if (data == '42.13-8-00') {
        return 4;
    }
    if (data == '69.20-6-01') {
        return 5;
    }
    if (data == '82.19-9-99') {
        return 6;
    }
    if (data == '68.21-8-01') {
        return 7;
    }
    if (data == '42.21-9-02') {
        return 8;
    }
    if (data == '68.22-6-00') {
        return 9;
    }
    if (data == '68.10-2-02') {
        return 10;
    }
    if (data == '42.92-8-02') {
        return 11;
    }
    if (data == '71.19-7-03') {
        return 12;
    }
    if (data == '43.30-4-04') {
        return 13;
    }
    if (data == '42.22-7-01') {
        return 14;
    }
    if (data == '42.99-5-01') {
        return 15;
    }
    if (data == '23.30-3-01') {
        return 16;
    }
    if (data == '42.21-9-03') {
        return 17;
    }
    if (data == '25.11-0-00') {
        return 18;
    }
    if (data == '68.10-2-03') {
        return 19;
    }
    if (data == '43.13-4-00') {
        return 20;
    }
    if (data == '68.10-2-01') {
        return 21;
    }
    if (data == '43.21-5-00') {
        return 22;
    }
    if (data == '43.30-4-99') {
        return 23;
    }
    if (data == '71.11-1-00') {
        return 24;
    }
    if (data == '42.99-5-99') {
        return 25;
    }
    if (data == '43.99-1-01') {
        return 26;
    }
    if (data == '43.99-1-03') {
        return 27;
    }
    if (data == '42.11-1-01') {
        return 28;
    }
    if (data == '71.12-0-00') {
        return 29;
    }
    if (data == '41.10-7-00') {
        return 30;
    }
    if (data == '41.20-4-00') {
        return 31;
    }
    return 999;
}

function getProperty(obj, props, defaultValue) {
    var res, isvoid = function(x){return typeof x === "undefined" || x === null;}
    if(!isvoid(obj)){
        if(isvoid(props)) props = [];
        if(typeof props  === "string") props = props.trim().split(".");
        if(props.constructor === Array){
            res = props.length>1 ? getProperty(obj[props.shift()],props,defaultValue) : obj[props[0]];
        }
    }
    return typeof res === "undefined" ? defaultValue: res;
}