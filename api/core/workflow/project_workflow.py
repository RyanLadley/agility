from api.core.workflow import workflow
from flask import request

import api.DAL.data_context.projects.project_select as project_select
import api.DAL.data_context.projects.project_insert as project_insert

from api.core.project.project import Project

import api.core.response as response
import api.core.sanitize as sanitize
import api.core.image_handler as image_handler

import os
import json


@workflow.route('/project/get/user', methods = ['POST'])
def get_projects_for_user():

    projects = project_select.projects_for_user()

    serialized_projects = []
    for project in projects:
        serialized_projects.append(project.serialize())

    return response.success(serialized_projects)

@workflow.route('/project/get/<project_id>', methods = ['POST'])
def get_project(project_id, api_response = True):

    project = project_select.project(project_id)

    serialized_project = project.serialize()
    
    if api_response:
        return response.success(serialized_project)
    else:
        return serialized_project


@workflow.route('/project/create', methods = ['POST'])
def create_project(api_response = True):

    project_form = sanitize.form_keys(json.loads(request.form['payload']))
    project = Project.map_from_form(project_form)

    project = project_insert.create_project(project)

    parent_url = "api/DAL/images/projects/"
    project.image.save_to_file_system(parent_url)

    return response.success(project.id)
