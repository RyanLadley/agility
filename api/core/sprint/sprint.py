import json

class Sprint: 

    def __init__(self):
        self.id = None
        self.name = None
        self.start_date = None
        self.end_date = None
        self.open = None
        
        self.points = 0
        self.cards = []


    @staticmethod
    def map_from_row(row):
        sprint = Sprint()

        sprint.id = row.get('id')
        sprint.name = row.get('name')
        sprint.start_date = row.get('start_date')
        sprint.end_date = row.get('end_date')
        sprint.open = row.get('open')

        return sprint

    @staticmethod
    def map_from_form(form):
        sprint = Sprint()

        sprint.id = form.get('id')
        sprint.name = form.get('name')
        sprint.start_date = form.get('start_date')
        sprint.end_date = form.get('end_date') or form.get('endDate')
        sprint.open = form.get('open')

        return sprint


    def add_card(self, card):

        self.cards.append(card)
        try:
            self.points += card.points
        except TypeError:
            pass


    def serialize(self):

        serial = {key:str(value) for key,value in self.__dict__.items()}

        serial['cards'] =  self._serialize_cards()
        
        return serial


    def _serialize_cards(self):

        serialized_cards = []
        for card in self.cards:
            serialized_cards.append(card.serialize())

        return serialized_cards