from api.core.workflow import workflow
from flask import request

import api.DAL.data_context.cards.card_insert as card_insert
import api.DAL.data_context.cards.card_select as card_select

from api.core.cards.standard_card import StandardCard
import api.core.response as response
import api.core.sanitize as sanitize

import json


@workflow.route('/create/card', methods = ['POST'])
def create_card():
    card_form = json.loads(request.form['payload'])
    card_form = sanitize.form_keys(card_form)
    print(card_form)
    stand_card = StandardCard.map_from_form(card_form)


    return card_insert.new_standard_card(stand_card)


@workflow.route('/get/cards/user', methods = ['POST'])
def get_card_with_user_task(id, api_response = True):

    user_json = '{"id" : "1", "name": "Ryan"}'
    user = json.loads(user_json)

    cards = card_select.standard_card_with_user_task(user['id'])

    serialized_cards = serialize_card_array(cards)

    if api_response:
        return response.success(serialized_cards)
    else:
        return serialized_cards
   
    


@workflow.route("/get/card/standard/<card_index>", methods = ['POST'])
def get_card_details(card_index):

    stand_card = StandardCard()
    stand_card.index = card_index

    card = card_select.standard_card_details(stand_card.proj_designator(), stand_card.proj_number())

    return response.success(card.serialize())


@workflow.route("/cards/get/backlog", methods = ['POST'])
def get_backlog():

    backlog = card_select.backlog()

    serialized_backlog = serialize_card_array(backlog)
    
    return response.success(serialized_backlog)


def serialize_card_array(cards):

    serialized_cards = []
    for card in cards:
        serialized_cards.append(card.serialize())

    return serialized_cards

    



