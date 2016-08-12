import json

class Sprint: 

    @staticmethod
    def map_from_form(form):
        sprint = Sprint()

        sprint.id = form.get('id')
        sprint.name = form.get('name')
        sprint.start_date = form.get('start_date')
        sprint.end_date = form.get('end_date') or form.get('endDate')
        sprint.open = form.get('open')
        sprint.project = form.get('project')

        sprint.cards = []
        sprint.points = 0

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