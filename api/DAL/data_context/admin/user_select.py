from api.DAL.data_context.database_connection import DatabaseConnection
from api.core.admin.user import User

import api.core.response as response
import MySQLdb
import json
import sys


@DatabaseConnection
def get_project_users(project_designator, cursor = None):
    
    cursor.execute("""
                SELECT id, first_name, last_name FROM ag_first.user;""")

    results = cursor.fetchall()

    users = []
    for row in results:
        users.append(User.map_from_row(row))

    print(users)
    return users