from api.core.workflow import workflow
from flask import request

import api.DAL.data_context.cards.card_update as card_update
import api.DAL.data_context.cards.card_insert as card_insert
import api.DAL.data_context.cards.card_select as card_select

from api.core.enum.card_type import CardType

from api.core.cards.card import Card
from api.core.cards.card import Step

import api.core.response as response
import api.core.sanitize as sanitize

import json


@workflow.route('/create/card', methods = ['POST'])
def create_card():
    card_form = json.loads(request.form['payload'])
    card_form = sanitize.form_keys(card_form)

    card = Card.map_from_form(card_form)
    
    if card.type == CardType(0).name: #Standard
        
        steps_form = card_form.get('steps')
        steps = create_objects_from_form_array(Step, steps_form)
        card.add_steps(steps)
        
        return_value = card_insert.new_card(card)

    elif card.type == CardType(1).name: #Epic
        
        return_value = card_insert.new_epic(card)

    else:
        
        return_value = response.error("Card Type is Invalid")
    
    return return_value


@workflow.route('/get/cards/user/project/<project_id>', methods = ['POST'])
def get_card_with_user_task(user_id, project_id, api_response = True):

    user_json = '{"id" : "1", "name": "Ryan"}'
    user = json.loads(user_json)

    cards = card_select.card_with_user_task(user['id'], project_id)

    serialized_cards = serialize_array(cards)

    if api_response:
        return response.success(serialized_cards)
    else:
        return serialized_cards
    


@workflow.route("/get/card/<card_index>/project/<project_id>", methods = ['POST'])
def get_card(card_index, project_id):

    card_refrence = Card()
    card_refrence.index = card_index

    card = card_select.card(project_id, card_refrence.proj_number())

    if card.type is CardType(0).name:
        steps = card_select.card_steps(card.id)
        card.add_steps(steps)

    elif card.type is CardType(1).name:
        assigned_cards = card_select.cards_assigned_to_epic(card.epic.id)
        card.add_assigned_cards(assigned_cards)

    return response.success(card.serialize())


@workflow.route("/get/card/name/<card_id>", methods = ['POST'])
def get_card_name(card_id):

    card = card_select.card_name(card_id)
    
    return response.success(card.serialize())


@workflow.route("/get/card/details/<card_id>", methods = ['POST'])
def get_card_details(card_id):

    card = card_select.card_details(card_id)

    return response.success(card.serialize())


@workflow.route("/get/card/description/<card_id>", methods = ['POST'])
def get_card_description(card_id):

    card = card_select.card_description(card_id)

    return response.success(card.serialize())


@workflow.route("/cards/get/backlog/project/<project_id>", methods = ['POST'])
def get_backlog(project_id):

    backlog = card_select.backlog(project_id)

    serialized_backlog = serialize_array(backlog)
    
    return response.success(serialized_backlog)


@workflow.route("/card/<card_id>/update/name", methods = ['POST'])
def update_card_name(card_id):

    card_form = json.loads(request.form['payload'])
    card_form = sanitize.form_keys(card_form)

    card = Card.map_from_form(card_form)

    card_update.name(card)

    return get_card_name(card.id)


@workflow.route("/card/<card_id>/update/description", methods = ['POST'])
def update_card_description(card_id):

    card_form = json.loads(request.form['payload'])
    card_form = sanitize.form_keys(card_form)

    card = Card.map_from_form(card_form)

    card_update.description(card)

    return get_card_description(card.id)


@workflow.route("/card/<card_id>/update/details", methods = ['POST'])
def update_card_details(card_id):

    card_form = json.loads(request.form['payload'])
    card_form = sanitize.form_keys(card_form)

    print(card_form)
    card = Card.map_from_form(card_form)

    card_update.details(card)

    return get_card_details(card.id)


@workflow.route("/card/<card_id>/update/steps", methods = ['POST'])
def update_card_steps(card_id):

    steps_form = json.loads(request.form['payload'])

    steps = create_objects_from_form_array(Step, steps_form) 

    updated_steps = []
    new_steps = []

    for step in steps:
        if step.id > 0:
            updated_steps.append(step)
        else:
            new_steps.append(step)

    card_update.steps(updated_steps)
    card_insert.steps_for(card_id, new_steps)

    steps = card_select.card_steps(card_id)

    return response.success(serialize_array(steps))


def serialize_array(array):

    serialized_array = []
    for item in array:
        serialized_array.append(item.serialize())

    return serialized_array


def create_objects_from_form_array(Class, form):

    array = []
    try:
        for item in form:
            item = sanitize.form_keys(item)
            array.append(Class.map_from_form(item))

    except TypeError:
        pass

    return array



