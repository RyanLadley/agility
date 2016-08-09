from api.core.enum.status import Status
from api.core.admin.user import User

class Step:

    def map_from_form(form):

        step = Step()

        step.id = int(form.get('step_id') or 0)
        step.task = form.get('step_task')
        step.assigned = User.map_from_form(form)
        step.status = step._get_status_from_form(form)

        return step


    def serialize(self):

        serial = {key:str(value) for key,value in self.__dict__.items()}

        serial['assigned'] = self.assigned.serialize()

        return serial


    def _get_status_from_form(self, form):

        try:
            return Status(form.get('step_status')).name
        except ValueError:
            return form.get('step_status')