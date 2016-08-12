from api.core.enum.card_type import CardType

import json

class Epic:

    @staticmethod
    def map_from_form(form):
        epic = Epic()

        epic.id = form.get('epic_id') or 0
        epic.name = form.get('epic_name')
        epic.background_color = form.get('epic_background_color')
        epic.foreground_color = form.get('epic_foreground_color')

        return epic


    def serialize(self):
        return {key:str(value) for key,value in self.__dict__.items()}
