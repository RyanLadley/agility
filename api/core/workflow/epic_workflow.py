from api.core.workflow import workflow
from flask import request

import api.DAL.data_context.cards.card_insert as card_insert
import api.DAL.data_context.cards.card_select as card_select

from api.core.cards.standard_card import StandardCard
import api.core.response as response

import json


@workflow('/epic/get/active')
def get_active_epics():

    epics = card_select.active_epics()

    return "HELLO!"