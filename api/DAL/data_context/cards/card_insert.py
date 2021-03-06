from api.DAL.data_context.database_connection import DatabaseConnection

from api.core.cards.card import Card
from api.core.enum.card_type import CardType
from api.core.enum.status import Status

import api.core.response as response
import MySQLdb
import json
import sys


@DatabaseConnection
def new_card(card, cursor = None):
    
    cursor.execute("""INSERT INTO  card ( 
                            project,
                            proj_number, 
                            name, 
                            type, 
                            epic, 
                            created, 
                            updated, 
                            status, 
                            points, 
                            poc)
                        values ( 
                            %(project)s,
                            %(proj_num)s, 
                            %(name)s, 
                            %(type)s, 
                            %(epic)s, 
                            NOW(), 
                            NOW(), 
                            %(status)s, 
                            %(points)s, 
                            %(poc)s);""",
                {'project': card.project, 'proj_num': card.proj_number(), 'name': card.name, 'type':CardType[card.type].value, 
                 'epic': card.epic.id, 'status' : Status[card.status].value, 'points': card.points, 'poc' : card.poc.id})

    cursor.execute("""SELECT LAST_INSERT_ID();""")
    new_id = cursor.fetchone()
    
    cursor.execute("""INSERT INTO  card_description (
                            card_id, 
                            description)
                       values (
                            %(card_id)s, 
                            %(description)s)""",
                {'card_id': new_id['LAST_INSERT_ID()'], 'description': card.description})

    
    for step in card.steps:
        
        cursor.execute("""INSERT INTO card_steps (
                                card_id, 
                                task, 
                                assigned, 
                                status)
                            values (
                                %(card_id)s, 
                                %(task)s, 
                                %(assigned_to)s, 
                                %(status)s)""",
                    {'card_id': new_id['LAST_INSERT_ID()'], 'task' : step.task, 'assigned_to': step.assigned.id, 'status': Status[step.status].value})

    return response.success()


@DatabaseConnection
def new_epic(card, cursor = None):
    
    cursor.execute("""INSERT INTO  card (
                            project, 
                            proj_number, 
                            name, 
                            type, 
                            created, 
                            updated, 
                            status, 
                            points, 
                            poc)
                        values (
                            %(project)s,
                            %(proj_num)s, 
                            %(name)s, %(type)s,  
                            NOW(), 
                            NOW(), 
                            %(status)s, 
                            %(points)s, 
                            %(poc)s);""",
                {'project': card.project, 'proj_num': card.proj_number(), 'name': card.name, 'type':CardType[card.type].value, 
                 'status' : Status[card.status].value, 'points': card.points, 'poc' : card.poc.id})

    cursor.execute("""SELECT LAST_INSERT_ID();""")
    card_id = cursor.fetchone()

    cursor.execute("""INSERT INTO  card_description (
                            card_id, 
                            description)
                       values (
                            %(card_id)s, 
                            %(description)s)""",
                {'card_id': card_id['LAST_INSERT_ID()'], 'description': card.description})
    
    cursor.execute("""INSERT INTO  epic (
                            background_color,
                            foreground_color)
                       values (
                            %(background_color)s,
                            %(foreground_color)s)""",
                {'background_color': card.epic.background_color, 'foreground_color': card.epic.foreground_color})
    
    cursor.execute("""SELECT LAST_INSERT_ID();""")
    epic_id = cursor.fetchone()
        
    cursor.execute("""UPDATE card
                        SET card.epic = %(epic)s
                    WHERE card.id = %(card_id)s""",
                {'card_id': card_id['LAST_INSERT_ID()'], 'epic': epic_id['LAST_INSERT_ID()']})


    return response.success()

@DatabaseConnection
def steps_for(card_id, steps, cursor = None):

    for step in steps:
        
        cursor.execute("""INSERT INTO card_steps (
                            card_id, 
                            task, 
                            assigned, 
                            status)
                        values (
                            (SELECT id from card WHERE card.id = %(card_id)s),
                            %(task)s, 
                            %(assigned_to)s, 
                            %(status)s)""",

                    {'card_id': card_id, 'task' : step.task, 'assigned_to': step.assigned.id, 'status': Status[step.status].value})

    return response.success()
