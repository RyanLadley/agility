from api.DAL.data_context.database_connection import DatabaseConnection

from api.core.sprint.sprint import Sprint

import api.core.response as response

import MySQLdb
import json


@DatabaseConnection
def close_current_sprint(sprint_id, cursor = None):

    cursor.execute("""
            UPDATE card
                SET     card.sprint = NULL
            WHERE   card.sprint = %(sprint_id)s AND
                    card.status <> 3;""",
            {'sprint_id': sprint_id})


    cursor.execute("""
            UPDATE sprint
                SET     sprint.open = 0, 
                        sprint.closed_date = NOW()
            WHERE   sprint.id = %(sprint_id)s;""",
            {'sprint_id': sprint_id})

    return response.success()