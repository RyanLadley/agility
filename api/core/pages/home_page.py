from api.core.pages import page

import api.core.workflow.card_workflow as card_workflow
import api.core.workflow.sprint_workflow as sprint_workflow

import api.DAL.data_context.cards.card_select as card_select
import api.DAL.data_context.admin.user_select as user_select

from api.core.enum.status import Status
import api.core.response as response

import json

#TODO: My god, make this less clumsy.
@page.route('/home', methods = ['POST'])
def initialize_home_page():

    user = '{"id" : "1", "name": "Ryan"}'

    cards = card_workflow.get_card_with_user_task(user, api_response = False)
    sprint = sprint_workflow.get_current_sprint(api_response = False)

    data = '{{"cards" : {cards}, "sprint" : {sprint} }}'.format(
        cards = json.dumps(cards), sprint = json.dumps(sprint))


    return response.success(json.loads(data))

