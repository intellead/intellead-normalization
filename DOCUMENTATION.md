# Welcome to Intellead Normalization documentation!

Intellead Normalization aims to be an easy way to normalize data for Intellead project.

## Contents
  * Introduction
  * Instalation
    * Config vars
    * Get a copy
  * Configuration and use cases
    * JavaScript call example
    * Database setup example
      * Fields table
      * FieldConfigs table
    * Expected result
  * Copyrights and Licence
  
## Introduction
Intellead Normalization aims to receive the data in json format and return data normalized to be used by intellead-classification and intellead-connector.

## Instalation

#### Config vars
The application uses a postgres database to store the dataset.  
For this it is necessary to configure the connection variables.  
You must config the following vars:
  * SECURITY_URL - Full URL to intellead-security auth endpoint (`http://intellead-security/auth`);
  * DATABASE_URL - Full URL to intellead-normalization-postgres (`postgres://<user>:<password>@<host>:<port>/<database>`)

#### Get a copy
I like to encourage you to contribute to the repository.
This should be as easy as possible for you but there are few things to consider when contributing. The following guidelines for contribution should be followed if you want to submit a pull request.
  * You need a GitHub account.
  * Submit an issue ticket for your issue if there is no one yet.
  * If you are able and want to fix this, fork the repository on GitHub.
  * Make commits of logical units and describe them properly.
  * If possible, submit tests to your patch / new feature so it can be tested easily.
  * Assure nothing is broken by running all the tests.
  * Open a pull request to the original repository and choose the right original branch you want to patch.
  * Even if you have write access to the repository, do not directly push or merge pull-requests. Let another team member review your pull request and approve.

## Configuration and use cases
Once the application is installed (check Installation) define the following settings to enable the application behavior.

#### JavaScript call example
```
request.post(
    url = http://your_domain.com/normalize,
    json = {
        'lead': {
            'role': 'owner/partner',
            'conversions': 5,
            'source': 'e-mail',
            'segment': 'construction'
        }
    },
    headers = {
        'token': <security-token>
    });
```

#### Database setup example

This service uses a postgres database to store the configurations that tells how the lead data should be normalized.  
It uses two tables, explained below.

##### Fields table

###### Columns
  * `id` - unique id (primary key)
  * `customer` - security customer id
  * `name` - field name that will be returned
  * `path` - path to find field at input json
  * `type` - field type
    * config - uses FieldConfigs table to find the normalized value
    * raw - uses lead value at input json
  * `default_number_value` - value to be returned when match was not found

| id | customer | name             | path             | type     | default_number_value |
| -- | -------- | ---------------- | ---------------- | -------- | -------------------- |
| 1  | 1        | norm_role        | lead.role        | 'config' | 0                    |
| 2  | 1        | norm_conversions | lead.conversions | 'raw'    | 0                    |
| 3  | 1        | norm_source      | lead.source      | 'config' | 0                    |
| 4  | 1        | norm_segment     | lead.segment     | 'config' | 0                    |

##### FieldConfigs table

###### Columns
  * `id` - unique id (primary key)
  * `field_id` - Fields table `id` (foreign key)
  * `value` - value to be compared at input json
  * `number_value` - value to be returned when `value` matches
  * `value_operator` - operator to be used when comparing `value` with value informed at input json
    * eq - equals comparison
    * like - contains comparison (`like '%value%'`)

| id | field_id | value            | number_value     | value_operator |
| -- | -------- | ---------------- | ---------------- | -------------- |
| 1  | 1        | 'partner'        | 1                | 'eq'           |
| 2  | 1        | 'owner'          | 2                | 'eq'           |
| 3  | 1        | 'owner/partner'  | 3                | 'eq'           |
| 4  | 3        | 'social'         | 1                | 'like'         |
| 5  | 3        | 'mail'           | 2                | 'like'         |
| 6  | 4        | 'services'       | 1                | 'eq'           |

#### Expected result

When using the above cenario, (JavaScript call example and Database setup example), the expected result will be:
```
{
    'norm_role': 3,
    'norm_conversions': 5,
    'norm_source': 2,
    'norm_segment': 0
}
```

## Copyrights and Licence
Project copyright and license is available at [LICENSE.md](./LICENSE.md).
TO DO
