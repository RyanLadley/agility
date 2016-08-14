from api.core.workflow import workflow
from flask import request

import api.DAL.data_context.cards.card_update as card_update
import api.DAL.data_context.cards.card_insert as card_insert
import api.DAL.data_context.cards.card_select as card_select

from api.core.enum.card_type import CardType

from api.core.admin.authorize import authorize

from api.core.admin.token import Token

from api.core.cards.card import Card
from api.core.cards.card import Step

import api.core.response as response
import api.core.sanitize as sanitize

import json


@workflow.route('/create/card', methods = ['POST'])
@authorize()
def create_card():

    '''Creates Card (Epic and Standard) from the card creation menu'''
    #TODO Make seperate functions for diffrent card types

    card_form = json.loads(request.form['payload'])
    card_form = sanitize.form_keys(card_form)

    card = Card.map_from_form(card_form)
    
    if card.type == CardType(0).name: #Standard
        
        #add the provided "steps" to the card to be netered into the database
        steps_form = card_form.get('steps')
        steps = create_objects_from_form_array(Step, steps_form)
        card.add_steps(steps)
        
        return_value = card_insert.new_card(card)

    elif card.type == CardType(1).name: #Epic
        #No special action needs to be taken, enter into database
        return_value = card_insert.new_epic(card)

    else:
        
        return_value = response.error("Card Type is Invalid")
    
    return return_value


@workflow.route('/get/cards/user/project/<project_id>', methods = ['POST'])
@authorize()
def get_card_with_user_task(project_id, api_response = True):

    '''Using the user id on the authentication token, send back all cards that
    have steps or are in anyway assigned to the user'''

    token_form = json.loads(request.form['token'])
    token_form = sanitize.form_keys(token_form)

    token = Token.map_from_form(token_form)

    cards = card_select.card_with_user_task(token.user_id, project_id)

    serialized_cards = serialize_array(cards)

    if api_response:
        return response.success(serialized_cards)
    else:
        return serialized_cards
    


@workflow.route("/get/card/<card_index>/project/<project_id>", methods = ['POST'])
@authorize()
def get_card(card_index, project_id):

    '''Using the cards index, send back all information pertaining to the card
    Used primarily for the card details page'''

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
@authorize()
def get_card_name(card_id, api_response = True):

    card = card_select.card_name(card_id)
    
    return response.success(card.serialize())


@workflow.route("/get/card/details/<card_id>", methods = ['POST'])
@authorize()
def get_card_details(card_id, api_response = True):

    '''this returns the section containing 
    the epic, poc, creation date, and updated date'''
    #TODO, consider better naming

    card = card_select.card_details(card_id)

    return response.success(card.serialize())


@workflow.route("/get/card/description/<card_id>", methods = ['POST'])
@authorize()
def get_card_description(card_id, api_response = True):

    '''Returns the dexcription of the card of which the id is associated'''

    card = card_select.card_description(card_id)

    return response.success(card.serialize())


@workflow.route("/cards/get/backlog/project/<project_id>", methods = ['POST'])
@authorize()
def get_backlog(project_id):

    '''Returns all cards that are open, but not assigned to a sprint'''

    backlog = card_select.backlog(project_id)

    serialized_backlog = serialize_array(backlog)
    
    return response.success(serialized_backlog)


@workflow.route("/cards/get/archive/project/<project_id>", methods = ['POST'])
@authorize()
def get_archive(project_id):

    '''Returns all closed Cards'''

    archive = card_select.archive(project_id)

    serialized_archive = serialize_array(archive)
    
    return response.success(serialized_archive)


@workflow.route("/card/<card_id>/update/name", methods = ['POST'])
@authorize()
def update_card_name(card_id):

    '''Updates the provided cards Name
    then returns this value from the database'''

    card_form = json.loads(request.form['payload'])
    card_form = sanitize.form_keys(card_form)

    card = Card.map_from_form(card_form)

    card_update.name(card)

    return get_card_name(card.id, api_response = False)


@workflow.route("/card/<card_id>/update/description", methods = ['POST'])
@authorize()
def update_card_description(card_id):

    '''Updates the provided card's description,
    then returns the value from the database'''

    card_form = json.loads(request.form['payload'])
    card_form = sanitize.form_keys(card_form)

    card = Card.map_from_form(card_form)

    card_update.description(card)

    return get_card_description(card.id, api_response = False)


@workflow.route("/card/<card_id>/update/details", methods = ['POST'])
@authorize()
def update_card_details(card_id):

    card_form = json.loads(request.form['payload'])
    card_form = sanitize.form_keys(card_form)

    print(card_form)
    card = Card.map_from_form(card_form)

    card_update.details(card)

    
    return get_card_details(card.id, api_response = False)


@workflow.route("/card/<card_id>/update/steps", methods = ['POST'])
@authorize()
def update_card_steps(card_id):

    '''Updates the steps of the provided card,
    then returns the value from the database'''

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

    '''Serializes all objects within an array, and returns the value'''
    #TODO Consider moving this to a diffrent file

    serialized_array = []
    for item in array:
        serialized_array.append(item.serialize())

    return serialized_array


def create_objects_from_form_array(Class, form):

    '''Takes a form and converts it into objects of the provided class'''

    array = []
    try:
        for item in form:
            item = sanitize.form_keys(item)
            array.append(Class.map_from_form(item))

    except TypeError:
        pass

    return array



