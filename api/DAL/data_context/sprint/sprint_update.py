from api.DAL.data_context.database_connection import DatabaseConnection

from api.core.sprint.sprint import Sprint

import api.core.response as response

import MySQLdb
import json


@DatabaseConnection
def close_current_sprint(cursor = None):

    cursor.execute("""
            UPDATE sprint
                SET open = 0, closed_date = NOW()
            WHERE open = 1;""")

    return response.success()