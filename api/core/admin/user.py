
class User:

    @staticmethod
    def map_from_form(form):

        user = User()

        user.id = form.get('user_id') or 0

        user.first_name = form.get('user_first_name') or "Unassigned"
        user.last_name = form.get('user_last_name') or ""

        return user

    def serialize(self):

        return {key:str(value) for key,value in self.__dict__.items()}