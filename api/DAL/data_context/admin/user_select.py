from api.DAL.data_context.database_connection import DatabaseConnection

from api.core.admin.user import User
from api.core.admin.credentials import Credentials
from api.core.admin.token import Token

import api.core.response as response
import MySQLdb
import json
import sys


@DatabaseConnection
def get_project_users(project_id, cursor = None):
    
    cursor.execute("""
                SELECT  user.id as user_id, 
                        user.first_name as user_first_name, 
                        user.last_name as user_last_name 
                    FROM user
                    WHERE user.id IN
                        (
                            SELECT distinct user_id
                                from user_projects
                            where project_id = %(project_id)s
                        );;""",
                {'project_id' : project_id})

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


@DatabaseConnection
def token(provided_token, cursor = None):

    cursor.execute("""
                SELECT  user.id as user_id, 
                        user.token as token_value
                    FROM user
                WHERE user.id = %(id)s;""",
                {'id' : provided_token.user_id})

    row = cursor.fetchone() or {}
    
    stored_token = Token.map_from_form(row)

    return stored_token


@DatabaseConnection
def project_access(project_id, token, cursor = None):

    cursor.execute("""
                SELECT  user_projects.user_id, 
                        user_projects.project_id
                    FROM user_projects
                WHERE   user_projects.user_id = %(user_id)s AND
                        user_projects.project_id = %(project_id)s;""",
                {'user_id' : token.user_id, 'project_id' : project_id})

    return cursor.fetchone() or None