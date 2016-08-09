
class User:

    @staticmethod
    def map_from_form(form):

        user = User()

        user.id = form.get('user_id')

        user.first_name = form.get('user_first_name')
        user.last_name = form.get('user_last_name')


        return user

    def serialize(self):

        return self.__dict__