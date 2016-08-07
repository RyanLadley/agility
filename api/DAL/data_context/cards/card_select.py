from api.DAL.data_context.database_connection import DatabaseConnection

from api.core.cards.standard_card import StandardCard
from api.core.enum.card_type import CardType
from api.core.enum.status import Status

import api.core.response as response
import MySQLdb
import json
import sys


@DatabaseConnection
def standard_card_with_user_task(user_id, cursor = None):
    
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
                        concat(user.first_name," ",user.last_name) as card_poc,
                        epic.id as epic_id, 
                        epic_card.name as epic_name, 
                        epic.background_color as epic_background_color, 
                        epic.foreground_color as epic_foreground_color
                    from card
                    JOIN card_description ON card_description.card_id = card.id
                    JOIN epic ON  epic.id = card.epic
                    JOIN card AS epic_card ON epic.card_id = epic_card.id
                    JOIN user ON card.poc = user.id
                WHERE card.poc = %(user_id)s OR
                    card.id IN 
                    (
                        SELECT distinct card_id
                            from card_steps
                        where assigned = %(user_id)s
                    );""",
                {'user_id': user_id})

    results = cursor.fetchall()

    cards = []
    for row in results:
        
        cards.append(StandardCard.map_from_form(row))

    return cards


@DatabaseConnection
def standard_card_details(proj_designator, proj_number, cursor = None):

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
                        concat(user.first_name," ",user.last_name) as card_poc,
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
                WHERE card.proj_designator = %(proj)s AND card.proj_number = %(num)s""",
                {'proj': proj_designator , 'num': proj_number})


    result = cursor.fetchone()

    card = StandardCard.map_from_form(result)

    cursor.execute("""
                SELECT card_steps.task, concat(user.first_name," ",user.last_name) as assigned, card_steps.status
                    FROM card_steps
                    JOIN user on user.id = card_steps.assigned
                WHERE card_id = %(id)s """,
                {'id' : card.id})

    steps = cursor.fetchall()

    card.add_steps_from_rows(steps)

    return card


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
                        concat(user.first_name," ",user.last_name) as card_poc,
                        epic.id as epic_id, 
                        epic_card.name as epic_name, 
                        epic.background_color as epic_background_color, 
                        epic.foreground_color as epic_foreground_color
                    from card
                    JOIN card_description ON card_description.card_id = card.id
                    JOIN epic ON  epic.id = card.epic
                    JOIN card AS epic_card ON epic.card_id = epic_card.id
                    JOIN user ON card.poc = user.id
                WHERE card.sprint = %(sprint_id)s""",
                {'sprint_id': sprint_id})

    results = cursor.fetchall()

    cards = []
    for row in results:
        cards.append(StandardCard.map_from_form(row))

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
                        concat(user.first_name," ",user.last_name) as card_poc,
                        epic.id as epic_id, 
                        epic_card.name as epic_name, 
                        epic.background_color as epic_background_color, 
                        epic.foreground_color as epic_foreground_color
                    from card
                    JOIN card_description ON card_description.card_id = card.id
                    JOIN epic ON  epic.id = card.epic
                    JOIN card AS epic_card ON epic.card_id = epic_card.id
                    LEFT JOIN user ON card.poc = user.id
                WHERE card.sprint IS NULL""")

    results = cursor.fetchall()

    cards = []
    for row in results:
        cards.append(StandardCard.map_from_form(row))

    return cards