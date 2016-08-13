from api.core.workflow import workflow
from flask import request

import api.DAL.data_context.projects.project_select as project_select
import api.DAL.data_context.projects.project_insert as project_insert

from api.core.project.project import Project

from api.core.admin.authorize import authorize
from api.core.admin.token import Token

import api.core.response as response
import api.core.sanitize as sanitize
import api.core.image_handler as image_handler

import os
import json


@workflow.route('/project/get/user', methods = ['POST'])
@authorize()
def get_projects_for_user():

    token_form = json.loads(request.form['token'])
    token_form = sanitize.form_keys(token_form)

    token = Token.map_from_form(token_form)

    projects = project_select.projects_for_user(token.user_id)

    serialized_projects = []
    for project in projects:
        serialized_projects.append(project.serialize())

    return response.success(serialized_projects)

@workflow.route('/project/get/<project_id>', methods = ['POST'])
@authorize()
def get_project(project_id, api_response = True):

    project = project_select.project(project_id)

    serialized_project = project.serialize()
    
    if api_response:
        return response.success(serialized_project)
    else:
        return serialized_project


@workflow.route('/project/create', methods = ['POST'])
@authorize()
def create_project(api_response = True):

    project_form = sanitize.form_keys(json.loads(request.form['payload']))
    project = Project.map_from_form(project_form)

    token_form = sanitize.form_keys(json.loads(request.form['token']))
    token = Token.map_from_form(token_form)

    project = project_insert.create_project(project, token.user_id)

    parent_url = "api/DAL/images/projects/"
    project.image.save_to_file_system(parent_url)

    return response.success(project.id)
