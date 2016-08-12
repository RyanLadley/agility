from api.DAL.data_context.database_connection import DatabaseConnection

from api.core.sprint.sprint import Sprint

import MySQLdb
import json


@DatabaseConnection
def current_sprint(project_id, cursor = None):

    cursor.execute("""
            SELECT  sprint.id, 
                    sprint.name, 
                    sprint.start_date, 
                    sprint.end_date, 
                    sprint.open,
                    sprint.project
                FROM sprint
            WHERE   sprint.open = 1 AND
                    sprint.project = %(project_id)s;""",
                    {'project_id': project_id})

    row = cursor.fetchone() or {}
    
    sprint = Sprint.map_from_form(row)

    return sprint