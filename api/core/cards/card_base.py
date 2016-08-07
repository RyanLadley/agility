from api.core.enum.card_type import CardType
from api.core.enum.status import Status

class CardBase:

    def proj_designator(self):

        return self.index[:3]


    def proj_number(self):

        return self.index[4:]


    def serialize(self):

        raise NotImplementedError()

    def get_index_from_form(self, form):

        try:
            return form.get(self.prefix + '_index') or (form.get(self.prefix + '_proj_designator') + "-" + str(form.get(self.prefix + '_proj_number')))
        except TypeError:
            return None

        return index

    def get_status_from_form(self, form):

        try:
            return Status(form.get(self.prefix + '_status')).name
        except ValueError:
            return form.get(self.prefix + '_status')