from api.core.workflow import workflow
from flask import request

import api.DAL.data_context.cards.card_insert as card_insert
import api.DAL.data_context.cards.card_select as card_select

from api.core.cards.card import Card
import api.core.response as response

import json


@workflow.route('/epics/get/active/project/<project_id>', methods = ['POST'])
def get_active_epics(project_id):

    epics = card_select.active_epics(project_id)

    serialized_epics = []
    for epic in epics:
        serialized_epics.append(epic.serialize())

    return response.success(serialized_epics)


@workflow.route('/epics/get/active/labels/project/<project_id>', methods = ['POST'])
def get_active_epic_labels(project_id, api_response = False):

    epics = card_select.active_epic_labels(project_id)

    serialized_epics = []
    for epic in epics:
        serialized_epics.append(epic.serialize())

    return serialized_epics
