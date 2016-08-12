from api.core.pages import page

import api.core.workflow.card_workflow as card_workflow
import api.core.workflow.sprint_workflow as sprint_workflow
import api.core.workflow.project_workflow as project_workflow

from api.core.enum.status import Status
import api.core.response as response

import json

#TODO: My god, make this less clumsy.
@page.route('/home/project/<project_id>', methods = ['POST'])
def initialize_home_page(project_id):

    user = '{"id" : "1", "name": "Ryan"}'

    cards = card_workflow.get_card_with_user_task(user, project_id, api_response = False)
    sprint = sprint_workflow.get_current_sprint(project_id, api_response = False)
    project = project_workflow.get_project(project_id, api_response = False)

    data = '{{"cards" : {cards}, "sprint" : {sprint} , "project" : {project} }}'.format(
        cards = json.dumps(cards), sprint = json.dumps(sprint), project = json.dumps(project))

    return response.success(json.loads(data))

