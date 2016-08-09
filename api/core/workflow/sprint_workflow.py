from api.core.workflow import workflow
from flask import request

import api.DAL.data_context.sprint.sprint_select as sprint_select
import api.DAL.data_context.sprint.sprint_update as sprint_update
import api.DAL.data_context.sprint.sprint_insert as sprint_insert

import api.DAL.data_context.cards.card_select as card_select
import api.DAL.data_context.cards.card_update as card_update


from api.core.sprint.sprint import Sprint
from api.core.cards.card import Card

import api.core.response as response

import json


@workflow.route('/sprint/get/current_with_cards', methods = ['POST'])
def get_current_sprint_with_cards():
    #try:

        sprint = sprint_select.current_sprint()
        standard_cards = card_select.standard_cards_from_sprint(sprint.id)

        for card in standard_cards:
            sprint.add_card(card)

        return response.success(sprint.serialize())

    #except:

        #return response.error("No Active Sprint")



@workflow.route('/sprint/get/current', methods = ['POST'])
def get_current_sprint(api_response = True):

    sprint = sprint_select.current_sprint()

    if api_response:
        return response.success(json.dumps(sprint.serialize()))
    else:
        return sprint.serialize()


@workflow.route('/sprint/close', methods = ['POST'])
def close_current_sprint():

    response = sprint_update.close_current_sprint()
    
    return response


@workflow.route('/sprint/open', methods = ['POST'])
def open_sprint():


    sprint = Sprint.map_from_form(json.loads(request.form['payload']))
    
    response = sprint_insert.open_sprint(sprint)

    return response


@workflow.route('/sprint/<sprint_id>/add/card/<card_id>', methods = ['POST'])
@workflow.route('/sprint/current/add/card/<card_id>', methods = ['POST'])
def add_card(card_id, sprint_id = None):

    if sprint_id is None:
        sprint = sprint_select.current_sprint()
        sprint_id = sprint.id
    
    response = card_update.sprint_for(card_id, sprint_id)

    return response

