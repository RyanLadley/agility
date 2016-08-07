
class User:

    @staticmethod
    def map_from_row(row):

        user = User()

        user.id = row['id']

        user.first_name = row['first_name']
        user.last_name = row['last_name']


        return user

    def serialize(self):

        return self.__dict__