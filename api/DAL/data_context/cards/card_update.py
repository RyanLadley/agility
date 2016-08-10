from api.DAL.data_context.database_connection import DatabaseConnection

import api.core.response as response

from api.core.enum.status import Status

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


@DatabaseConnection
def steps(steps, cursor = None):

    for step in steps: 

        cursor.execute("""
            UPDATE card_steps
                SET card_steps.task = %(step_task)s, 
                    card_steps.assigned = %(step_assigned)s,
                    card_steps.status = %(step_status)s
            WHERE card_steps.id = %(step_id)s""",
            {'step_id': step.id, 'step_assigned' : step.assigned.id, 'step_status': Status[step.status].value, 'step_task': step.task})

    return response.success()


@DatabaseConnection
def details(card, cursor = None):

    print(card.serialize())
    cursor.execute("""
        UPDATE card
            SET card.epic = %(card_epic)s, 
                card.status = %(card_status)s,
                card.points = %(card_points)s,
                card.poc = %(card_poc)s,
                card.updated = NOW()
        WHERE card.id = %(card_id)s""",
        {'card_id': card.id, 'card_epic': card.epic.id, 'card_status': Status[card.status].value, 'card_points': card.points, 'card_poc' : card.poc.id})

    return response.success()


@DatabaseConnection
def description(card, cursor = None):

    cursor.execute("""
        UPDATE card, card_description
            SET card_description.description = %(card_description)s,
                card.updated = NOW()
        WHERE card_description.card_id = %(card_id)s AND
              card.id =  %(card_id)s""",
        {'card_id': card.id, 'card_description': card.description})

    return response.success()
    

@DatabaseConnection
def name(card, cursor = None):

    cursor.execute("""
        UPDATE card
            SET card.name = %(card_name)s,
                card.updated = NOW()
        WHERE card.id = %(card_id)s""",
        {'card_id': card.id, 'card_name': card.name})

    return response.success()