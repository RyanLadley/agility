from api.DAL.data_context.database_connection import DatabaseConnection

from api.core.sprint.sprint import Sprint

import MySQLdb
import json


@DatabaseConnection
def current_sprint(cursor = None):

    cursor.execute("""
            SELECT id, name, start_date, end_date, open
                FROM sprint
            WHERE open = 1;""")

    row = cursor.fetchone() or {}
    
    sprint = Sprint.map_from_row(row)

    return sprint