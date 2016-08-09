from api.core.workflow import workflow
from flask import request

import api.DAL.data_context.cards.card_insert as card_insert
import api.DAL.data_context.cards.card_select as card_select

from api.core.cards.card import Card
import api.core.response as response

import json


@workflow.route('/epics/get/active', methods = ['POST'])
def get_active_epics():

    epics = card_select.active_epics()

    serialized_epics = []
    for epic in epics:
        serialized_epics.append(epic.serialize())

    return response.success(serialized_epics)

@workflow.route('/epics/get/active/labels', methods = ['POST'])
def get_active_epic_labels(api_response = False):

    epics = card_select.active_epic_labels()

    serialized_epics = []
    for epic in epics:
        serialized_epics.append(epic.serialize())

    return serialized_epics
