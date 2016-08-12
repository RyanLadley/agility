from api.DAL.data_context.database_connection import DatabaseConnection

from api.core.project.project import Project

import api.core.response as response
import MySQLdb
import json


@DatabaseConnection
def projects_for_user(cursor = None):

    cursor.execute("""
                SELECT  project.id as proj_id, 
                        project.designator as proj_designator, 
                        project.name as proj_name,
                        project_image.folder as image_folder, 
                        project_image.file_name as image_file_name,
                        project_image.file_type as image_file_type
                    from project
                    LEFT JOIN project_image ON project_image.project_id = project.id""")

    results = cursor.fetchall()

    projects = []
    for row in results:
        
        projects.append(Project.map_from_form(row))

    return projects

@DatabaseConnection
def project(project_id, cursor = None):

    cursor.execute("""
                SELECT distinct
                        project.id as proj_id, 
                        project.designator as proj_designator, 
                        project.name as proj_name,
                        project_image.folder as image_folder, 
                        project_image.file_name as image_file_name,
                        project_image.file_type as image_file_type
                    from project
                    LEFT JOIN project_image ON project_image.project_id = project.id
                WHERE project.id = %(project_id)s""",
                {'project_id': project_id})

    row = cursor.fetchone()
    
    project = Project.map_from_form(row)

    return project