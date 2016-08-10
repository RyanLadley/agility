from api.core.enum.card_type import CardType
from api.core.enum.status import Status

from api.core.cards.epic import Epic
from api.core.cards.step import Step
from api.core.admin.user import User

import json

class Card:

    @staticmethod
    def map_from_form(form):
        card = Card()

        card.id = form.get('card_id')
        card.index = card._get_index_from_form(form)
        card.name = form.get('card_name')
        card.created = form.get('card_created')
        card.updated = form.get('card_updated')
        card.points = form.get('card_points')
        card.description = form.get('card_description')
        
        card.type =  card._get_type_from_form(form)
        card.status = card._get_status_from_form(form)

        card.poc = User.map_from_form(form) #point of contact
        card.epic = Epic.map_from_form(form)

        return card


    def add_steps(self, steps):
        
        if not hasattr(self, 'steps'):
            self.steps = []

        self.steps += steps


    def add_assigned_cards(self, cards):

        if not hasattr(self, 'assigned_cards'):
            self.assigned_cards = []

        self.assigned_cards += cards


    def serialize(self):
        serial = {key:str(value) for key,value in self.__dict__.items()}

        serial['epic'] = self.epic.serialize()
        serial['poc'] = self.poc.serialize()

        if 'steps' in serial:
            serial['steps'] =  self._serialize_steps()

        if 'assigned_cards' in serial:
            serial['assigned_cards'] = self._serialize_assigned_cards()
        
        return serial

    
    def proj_designator(self):

        return self.index[:3]


    def proj_number(self):

        return self.index[4:]


    def _get_index_from_form(self, form):

        try:
            return form.get('card_index') or (form.get('card_proj_designator') + "-" + str(form.get('card_proj_number')))
        except TypeError:
            return None

        return index


    def _get_status_from_form(self, form):

        try:
            return Status(form.get('card_status')).name
        except ValueError:
            return form.get('card_status')

    def _get_type_from_form(self, form):

        try:
            return CardType(form.get('card_type')).name
        except ValueError:
            return form.get('card_type')


    def _serialize_steps(self):
        
        serialized_steps = []
        for step in self.steps:
            serialized_steps.append(step.serialize())

        return serialized_steps


    def _serialize_assigned_cards(self):
        
        serialized_cards = []
        for card in self.assigned_cards:
            serialized_cards.append(card.serialize())

        return serialized_cards

