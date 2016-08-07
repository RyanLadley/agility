from api.core.enum.card_type import CardType
from api.core.cards.card_base import CardBase

import json

class Epic(CardBase):

    def __init__(self):
        self.prefix = 'epic'


    @staticmethod
    def map_from_form(form):
        epic = Epic()

        epic.id = form.get('epic_index')
        epic.index = epic.get_index_from_form(form)
        epic.name = form.get('epic_name')
        epic.type = CardType(form.get('card_type') or 1).name
        epic.created = form.get('epic_created')
        epic.updated = form.get('epic_updated')
        epic.points = form.get('epic_points')
        epic.poc = form.get('epic_poc') #point of contact
        epic.status = form.get('epic_status')
        epic.description = form.get('epic_description')
        epic.background_color = form.get('epic_background_color')
        epic.foreground_color = form.get('epic_foreground_color')

        return epic


    def serialize(self):
        return {key:str(value) for key,value in self.__dict__.items()}
