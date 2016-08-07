from api.DAL.data_context.database_connection import DatabaseConnection

import api.core.response as response

import MySQLdb
import json


@DatabaseConnection
def sprint_for(card_id, sprint_id, cursor = None):

    cursor.execute("""
            UPDATE card
                SET sprint = %(sprint_id)s
            WHERE card.id = %(card_id)s;""",
            {'card_id' : card_id, 'sprint_id' : sprint_id})

    return response.success()
    