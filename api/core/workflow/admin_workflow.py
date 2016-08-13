from api.core.workflow import workflow
from flask import request

import api.DAL.data_context.admin.user_update as user_update
import api.DAL.data_context.admin.user_insert as user_insert
import api.DAL.data_context.admin.user_select as user_select

from api.core.admin.credentials import Credentials
from api.core.admin.token import Token

from api.core.admin.validate import InvalidCredential
import api.core.admin.validate as validate

import api.core.response as response
import api.core.sanitize as sanitize

import json

@workflow.route('/admin/register', methods = ['POST'])
def register_user():

    credentials_form = json.loads(request.form['payload'])
    credentials_form = sanitize.form_keys(credentials_form)

    credentials = Credentials.map_from_form(credentials_form)

    try:
        validate.email(credentials.email)
        validate.name(credentials.first_name)
        validate.name(credentials.last_name)
        validate.password(credentials.password)
    
    except InvalidCredential as invalid:
        return response.error(invalid.args[0])

    credentials.hash_password()

    user_insert.new_user(credentials)
    
    return response.success()


@workflow.route('/admin/login', methods = ['POST'])
def login():

    credentials_form = json.loads(request.form['payload'])
    credentials_form = sanitize.form_keys(credentials_form)

    provided_credentials = Credentials.map_from_form(credentials_form)
    stored_credentials = user_select.login_credentials(provided_credentials)

    try:
        validate.login(stored_credentials, provided_credentials)
    
    except InvalidCredential as invalid:
        print(response.error(invalid.args[0]))
        return response.error(invalid.args[0])

    token = Token()
    token.user_id = stored_credentials.id
    token.update()

    user_update.token(token)
    
    return response.add_token(token = token)
