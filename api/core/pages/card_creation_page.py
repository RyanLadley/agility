from api.core.pages import page


import api.DAL.data_context.cards.card_select as card_select
import api.DAL.data_context.admin.user_select as user_select

import api.core.workflow.epic_workflow as epic_workflow

from api.core.admin.authorize import authorize

from api.core.enum.status import Status

import api.core.response as response

import json

@page.route('/create/card/project/<project_id>', methods = ['POST'])
@authorize()
def initialize_creation_page(project_id):
    index = get_next_index(project_id);
    statuses = get_statuses();
    users = get_users(project_id);
    epics = get_epics(project_id);

    data = '{{"card_index" : "{index}", "statuses" : {statuses} , "users" : {users}, "epics": {epics} }}'.format(
        index = index, statuses = statuses, users = users, epics = epics)
    
    return response.success(json.loads(data))


def get_next_index(project_id):

    index = card_select.next_card_index(project_id)

    return index


def get_statuses():
     return json.dumps([enum.name for enum in Status])


def get_users(project_id):
    
    #This will probably be an api call eventually. Be on the look out for the update!
    users = user_select.get_project_users(project_id)
    serialized_users = _serialize_users(users)

    return json.dumps(serialized_users)


def get_epics(project_id):

    epics = epic_workflow.get_active_epic_labels(project_id, api_response = False)
     #Add None to possible epics
    epics.append({'background_color': '#ffffff', 'id': '0', 'foreground_color': '#000000', 'name': 'None'})
    return json.dumps(epics)


def _serialize_users(users):

    serialized_users = []
    for user in users:
        serialized_users.append(user.serialize())

    return serialized_users