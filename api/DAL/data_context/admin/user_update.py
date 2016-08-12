from api.DAL.data_context.database_connection import DatabaseConnection

import api.core.response as response

@DatabaseConnection
def token(token, cursor = None):

    print(token.serialize())
    cursor.execute("""
            UPDATE user
                SET     user.token = %(value)s, 
                        user.token_exp = DATE_ADD(NOW(), INTERVAL 4 HOUR)
            
            WHERE   user.id = %(id)s ;""",
                    {'value': token.token_value, 'id': token.user_id} )

    return response.success()