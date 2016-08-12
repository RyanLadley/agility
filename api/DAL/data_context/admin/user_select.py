from api.DAL.data_context.database_connection import DatabaseConnection

from api.core.admin.user import User
from api.core.admin.credentials import Credentials

import api.core.response as response
import MySQLdb
import json
import sys


@DatabaseConnection
def get_project_users(project_designator, cursor = None):
    
    cursor.execute("""
                SELECT  id as user_id, 
                        first_name as user_first_name, 
                        last_name as user_last_name 
                    FROM user;""")

    results = cursor.fetchall()

    users = []
    for row in results:
        users.append(User.map_from_form(row))

    return users


@DatabaseConnection
def login_credentials(provided_credentials, cursor = None):
    
    cursor.execute("""
                SELECT  user.id, 
                        user.email,
                        user.password 
                    FROM user
                WHERE user.email = %(email)s;""",
                {'email' : provided_credentials.email})

    row = cursor.fetchone() or {}

    
    stored_credentials = Credentials.map_from_form(row)

    return stored_credentials