from api.core.workflow import workflow
from flask import request

import api.DAL.data_context.sprint.sprint_select as sprint_select
import api.DAL.data_context.sprint.sprint_update as sprint_update
import api.DAL.data_context.sprint.sprint_insert as sprint_insert

import api.DAL.data_context.cards.card_select as card_select
import api.DAL.data_context.cards.card_update as card_update

from api.core.admin.authorize import authorize

from api.core.sprint.sprint import Sprint
from api.core.cards.card import Card

import api.core.response as response

import json


@workflow.route('/sprint/get/current_with_cards/project/<project_id>', methods = ['POST'])
@authorize()
def get_current_sprint_with_cards(project_id):
    sprint = sprint_select.current_sprint(project_id)
    standard_cards = card_select.standard_cards_from_sprint(sprint)

    for card in standard_cards:
        sprint.add_card(card)

    return response.success(sprint.serialize())



@workflow.route('/sprint/get/current/project/<project_id>', methods = ['POST'])
@authorize()
def get_current_sprint(project_id, api_response = True):

    sprint = sprint_select.current_sprint(project_id)

    if api_response:
        return response.success(json.dumps(sprint.serialize()))
    else:
        return sprint.serialize()


@workflow.route('/sprint/close/<sprint_id>/project/<project_id>', methods = ['POST'])
@authorize()
def close_sprint(sprint_id, project_id):

    response = sprint_update.close_current_sprint(sprint_id)
    
    return response


@workflow.route('/sprint/open', methods = ['POST'])
@authorize()
def open_sprint():


    sprint = Sprint.map_from_form(json.loads(request.form['payload']))
    
    response = sprint_insert.open_sprint(sprint)

    return response


@workflow.route('/sprint/<sprint_id>/add/card/<card_id>', methods = ['POST'])
@workflow.route('/sprint/current/add/card/<card_id>', methods = ['POST'])
@authorize()
def add_card(card_id, sprint_id = None):

    if sprint_id is None:
        sprint = sprint_select.current_sprint()
        sprint_id = sprint.id
    
    response = card_update.sprint_for(card_id, sprint_id)

    return response

