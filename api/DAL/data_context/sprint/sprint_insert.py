from api.DAL.data_context.database_connection import DatabaseConnection

import api.core.response as response
import MySQLdb


@DatabaseConnection
def open_sprint(sprint, cursor = None):
    cursor.execute('''
        INSERT sprint (
                name, 
                start_date, 
                end_date, 
                open,
                project)
            VALUES (
                %(name)s, 
                NOW(), 
                DATE_ADD(NOW(), INTERVAL %(end_date)s WEEK), 
                1,
                %(project)s);''',
            {'name': sprint.name, 'end_date' : sprint.end_date, 'project': sprint.project})

    return response.success()