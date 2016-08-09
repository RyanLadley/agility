from api.DAL.data_context.database_connection import DatabaseConnection

from api.core.cards.card import Card
from api.core.cards.epic import Epic
from api.core.cards.step import Step

from api.core.enum.card_type import CardType
from api.core.enum.status import Status

import api.core.response as response
import MySQLdb
import json
import sys


@DatabaseConnection
def card_with_user_task(user_id, cursor = None):
    
    cursor.execute("""
                SELECT distinct 
                        card.id as card_id, 
                        card.proj_designator as card_proj_designator, 
                        card.proj_number as card_proj_number, 
                        card.name as card_name, 
                        card.type as card_type, 
                        card.status as card_status, 
                        card.points as card_points, 
                        card_description.description as card_description, 
                        user.id as user_id,
                        user.first_name as user_first_name,
                        user.last_name as user_last_name,
                        card.created as card_created,
                        card.updated as card_updated,
                        epic.id as epic_id, 
                        epic_card.name as epic_name, 
                        epic.background_color as epic_background_color, 
                        epic.foreground_color as epic_foreground_color
                    from card
                    JOIN card_description ON card_description.card_id = card.id
                    LEFT JOIN epic ON  epic.id = card.epic
                    LEFT JOIN card AS epic_card ON epic.card_id = epic_card.id
                    LEFT JOIN user ON card.poc = user.id
                WHERE card.status <> 3 AND (
                    card.poc = %(user_id)s OR
                    card.id IN 
                        (
                            SELECT distinct card_id
                                from card_steps
                            where assigned = %(user_id)s
                        ));""",
                {'user_id': user_id})

    results = cursor.fetchall()

    cards = []
    for row in results:
        
        cards.append(Card.map_from_form(row))

    return cards


@DatabaseConnection
def card(proj_designator, proj_number, cursor = None):

    cursor.execute("""
                SELECT distinct 
                        card.id as card_id, 
                        card.proj_designator as card_proj_designator, 
                        card.proj_number as card_proj_number, 
                        card.name as card_name, 
                        card.type as card_type, 
                        card.status as card_status, 
                        card.points as card_points, 
                        card_description.description as card_description, 
                        user.id as user_id,
                        user.first_name as user_first_name,
                        user.last_name as user_last_name,
                        card.created as card_created,
                        card.updated as card_updated,
                        epic.id as epic_id, 
                        epic_card.name as epic_name, 
                        epic.background_color as epic_background_color, 
                        epic.foreground_color as epic_foreground_color
                    from card
                    JOIN card_description ON card_description.card_id = card.id
                    LEFT JOIN epic ON  epic.id = card.epic
                    LEFT JOIN card AS epic_card ON epic.card_id = epic_card.id
                    LEFT JOIN user ON card.poc = user.id
                WHERE card.proj_designator = %(proj)s AND card.proj_number = %(num)s""",
                {'proj': proj_designator , 'num': proj_number})


    result = cursor.fetchone()

    card = Card.map_from_form(result)

    return card


@DatabaseConnection
def card_steps(card_id, cursor = None):

    cursor.execute("""
                SELECT  card_steps.id as step_id,
                        card_steps.task as step_task, 
                        user.id as user_id,
                        user.first_name as user_first_name,
                        user.last_name as user_last_name, 
                        card_steps.status as step_status
                    FROM card_steps
                    LEFT JOIN user on user.id = card_steps.assigned
                WHERE card_id = %(id)s """,
                {'id' : card_id})

    results = cursor.fetchall()

    steps = []
    for row in results:
        steps.append(Step.map_from_form(row))

    return steps

@DatabaseConnection
def card_name(card_id, cursor = None):

    cursor.execute("""
                SELECT distinct  
                        card.name as card_name
                    from card
                WHERE card.id = %(card_id)s""",
                {'card_id': card_id})

    result = cursor.fetchone()

    card = Card.map_from_form(result)

    return card


@DatabaseConnection
def card_details(card_id, cursor = None):

    cursor.execute("""
                SELECT distinct  
                        card.status as card_status, 
                        card.points as card_points, 
                        user.id as user_id,
                        user.first_name as user_first_name,
                        user.last_name as user_last_name,
                        card.created as card_created,
                        card.updated as card_updated,
                        epic.id as epic_id, 
                        epic_card.name as epic_name, 
                        epic.background_color as epic_background_color, 
                        epic.foreground_color as epic_foreground_color
                    from card
                    LEFT JOIN epic ON  epic.id = card.epic
                    LEFT JOIN card AS epic_card ON epic.card_id = epic_card.id
                    LEFT JOIN user ON card.poc = user.id
                WHERE card.id = %(card_id)s""",
                {'card_id': card_id})

    result = cursor.fetchone()

    card = Card.map_from_form(result)

    return card


@DatabaseConnection
def card_description(card_id, cursor = None):

    cursor.execute("""
                SELECT distinct  
                        card_description.description as card_description
                    FROM card_description
                WHERE card_description.card_id = %(card_id)s""",
                {'card_id': card_id})

    result = cursor.fetchone()

    card = Card.map_from_form(result)

    return card


@DatabaseConnection
def cards_assigned_to_epic(epic_id, cursor = None):

    cursor.execute("""
                SELECT  card.id as card_id, 
                        card.proj_designator as card_proj_designator, 
                        card.proj_number as card_proj_number, 
                        card.name as card_name, 
                        card.type as card_type, 
                        card.status as card_status, 
                        card.points as card_points, 
                        card_description.description as card_description, 
                        user.id as user_id,
                        user.first_name as user_first_name,
                        user.last_name as user_last_name,
                        card.created as card_created,
                        card.updated as card_updated,
                        epic.id as epic_id, 
                        epic_card.name as epic_name, 
                        epic.background_color as epic_background_color, 
                        epic.foreground_color as epic_foreground_color
                    from card
                    JOIN card_description ON card_description.card_id = card.id
                    JOIN epic ON  epic.id = card.epic
                    JOIN card AS epic_card ON epic.card_id = epic_card.id
                    JOIN user ON card.poc = user.id
                WHERE card.epic = %(epic_id)s AND card.id <> epic.card_id""",
                {'epic_id': epic_id})

    results = cursor.fetchall()

    cards = []
    for row in results:
        cards.append(Card.map_from_form(row))

    return cards


@DatabaseConnection
def current_project_number(project_designator, cursor = None):

    cursor.execute("""
            SELECT max(proj_number) as proj_number FROM ag_first.card
            WHERE proj_designator = %(proj_designator)s
            ORDER BY proj_number DESC;""",
        {'proj_designator': project_designator})

    result = cursor.fetchone()

    return result

@DatabaseConnection
def standard_cards_from_sprint(sprint_id, cursor = None):
    
    cursor.execute("""
                SELECT  card.id as card_id, 
                        card.proj_designator as card_proj_designator, 
                        card.proj_number as card_proj_number, 
                        card.name as card_name, 
                        card.type as card_type, 
                        card.status as card_status, 
                        card.points as card_points, 
                        card_description.description as card_description, 
                        user.id as user_id,
                        user.first_name as user_first_name,
                        user.last_name as user_last_name,
                        card.created as card_created,
                        card.updated as card_updated,
                        epic.id as epic_id, 
                        epic_card.name as epic_name, 
                        epic.background_color as epic_background_color, 
                        epic.foreground_color as epic_foreground_color
                    from card
                    JOIN card_description ON card_description.card_id = card.id
                    LEFT JOIN epic ON  epic.id = card.epic
                    LEFT JOIN card AS epic_card ON epic.card_id = epic_card.id
                    LEFT JOIN user ON card.poc = user.id
                WHERE card.sprint = %(sprint_id)s AND
                      card.type = 0""",
                {'sprint_id': sprint_id})

    results = cursor.fetchall()

    cards = []
    for row in results:
        cards.append(Card.map_from_form(row))

    return cards

@DatabaseConnection
def backlog(cursor = None):

    cursor.execute("""
                SELECT  card.id as card_id, 
                        card.proj_designator as card_proj_designator, 
                        card.proj_number as card_proj_number, 
                        card.name as card_name, 
                        card.type as card_type, 
                        card.status as card_status, 
                        card.points as card_points, 
                        card_description.description as card_description, 
                        user.id as user_id,
                        user.first_name as user_first_name,
                        user.last_name as user_last_name,
                        card.created as card_created,
                        card.updated as card_updated,
                        epic.id as epic_id, 
                        epic_card.name as epic_name, 
                        epic.background_color as epic_background_color, 
                        epic.foreground_color as epic_foreground_color
                    from card
                    JOIN card_description ON card_description.card_id = card.id
                    LEFT JOIN epic ON  epic.id = card.epic
                    LEFT JOIN card AS epic_card ON epic.card_id = epic_card.id
                    LEFT JOIN user ON card.poc = user.id
                WHERE card.sprint IS NULL AND card.type <> 1""")

    results = cursor.fetchall()

    cards = []
    for row in results:
        cards.append(Card.map_from_form(row))

    return cards


@DatabaseConnection
def active_epics(cursor = None):

    cursor.execute("""
                SELECT  card.id as card_id, 
                        card.proj_designator as card_proj_designator, 
                        card.proj_number as card_proj_number, 
                        card.name as card_name, 
                        card.type as card_type, 
                        card.status as card_status, 
                        card.points as card_points, 
                        card_description.description as card_description, 
                        user.id as user_id,
                        user.first_name as user_first_name,
                        user.last_name as user_last_name,
                        card.created as card_created,
                        card.updated as card_updated,
                        epic.id as epic_id, 
                        epic_card.name as epic_name, 
                        epic.background_color as epic_background_color, 
                        epic.foreground_color as epic_foreground_color
                    from card
                    JOIN card_description ON card_description.card_id = card.id
                    JOIN epic ON  epic.id = card.epic
                    JOIN card AS epic_card ON epic.card_id = epic_card.id
                    LEFT JOIN user ON card.poc = user.id
                WHERE card.type = 1""")

    results = cursor.fetchall()

    cards = []
    for row in results:
        cards.append(Card.map_from_form(row))

    return cards


@DatabaseConnection
def active_epic_labels(cursor = None):

    cursor.execute("""
                SELECT  epic.id as epic_id, 
                        epic_card.name as epic_name, 
                        epic.background_color as epic_background_color, 
                        epic.foreground_color as epic_foreground_color
                    from epic
                    JOIN card AS epic_card ON epic.card_id = epic_card.id
                WHERE epic_card.status <> 3""")

    results = cursor.fetchall()

    labels = []
    for row in results:
        labels.append(Epic.map_from_form(row))

    return labels