from api.core.enum.card_type import CardType
from api.core.enum.status import Status

from api.core.cards.card_base import CardBase
from api.core.cards.epic import Epic
from api.core.cards.step import Step

import json

class StandardCard(CardBase):

    def __init__(self):
        self.prefix = 'card'


    @staticmethod
    def map_from_form(form):
        card = StandardCard()

        card.id = form.get('card_id')
        card.index = card.get_index_from_form(form)
        card.name = form.get('card_name')
        card.type = CardType(form.get('card_type') or 0).name
        card.created = form.get('card_created')
        card.updated = form.get('card_updated')
        card.points = form.get('card_points')
        card.poc = form.get('card_poc') #point of contact
        card.status = card.get_status_from_form(form)
        card.description = form.get('card_description')
        card.steps =[]
        
        card.epic = Epic.map_from_form(form)

        return card


    def add_steps_from_rows(self, rows):
        for step in rows:
            self.steps.append(Step.map_from_row(step))


    def serialize(self):

        serial = {key:str(value) for key,value in self.__dict__.items()}

        serial['epic'] = self.epic.serialize()
        serial['steps'] =  self._serialize_steps()
        
        return serial



    def _serialize_steps(self):

        serialized_steps = []
        for step in self.steps:
            serialized_steps.append(step.serialize())

        return serialized_steps
