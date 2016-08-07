from api.core.pages import page


import api.DAL.data_context.cards.card_select as card_select
import api.DAL.data_context.admin.user_select as user_select
from api.core.enum.status import Status

import api.core.response as response

import json

@page.route('/create/standard', methods = ['POST'])
def initialize_creation_page():
    index = get_next_index();
    statuses = get_statuses();
    users = get_users();

    data = '{{"card_index" : "{index}", "statuses" : {statuses} , "users" : {users}}}'.format(
        index = index, statuses = statuses, users = users)
    
    return response.success(json.loads(data))


def get_next_index():
    project_designator = "ABC"
    current_number = (card_select.current_project_number(project_designator))['proj_number']
    new_number = current_number + 1

    index = project_designator+ "-" +str(new_number)
    return index


def get_statuses():
     return json.dumps([enum.name for enum in Status])


def get_users():
    
    users = user_select.get_project_users("ABC")
    serialized_users = _serialize_users(users)

    return json.dumps(serialized_users)


def _serialize_users(users):

    serialized_users = []
    for user in users:
        serialized_users.append(user.serialize())

    return serialized_users