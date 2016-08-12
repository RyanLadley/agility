from api.DAL.data_context.database_connection import DatabaseConnection

from api.core.sprint.sprint import Sprint

import api.core.response as response

import MySQLdb
import json


@DatabaseConnection
def close_current_sprint(project_id, cursor = None):

    cursor.execute("""
            UPDATE sprint
                SET     sprint.open = 0, 
                        sprint.closed_date = NOW()
            
            WHERE   sprint.open = 1 AND
                    sprint.project = %(project_id)s;""",
                    {'project_id': project_id})

    return response.success()