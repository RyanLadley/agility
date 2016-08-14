from api.DAL.data_context.database_connection import DatabaseConnection

@DatabaseConnection
def create_project(project, user_id, cursor = None):

    cursor.execute('''
        INSERT project(
                designator, 
                name)
            VALUES (
                %(designator)s,
                %(name)s);''',
        {'designator': project.designator, 'name': project.name})


    cursor.execute("""SELECT LAST_INSERT_ID();""")
    project.id = cursor.fetchone()['LAST_INSERT_ID()']

    if project.image.data: #Image has new data to write, so create new folder and file, otherwise defaults are used
        project.image.folder = str(int(project.id/100))
        project.image.file_name = str(project.id%100)

    cursor.execute('''
        INSERT project_image(
                project_id, 
                folder,
                file_name,
                file_type)
            VALUES (
                %(project_id)s,
                %(folder)s,
                %(file_name)s,
                %(file_type)s);''',
        {'project_id': project.id, 'folder': project.image.folder, 'file_name' : project.image.file_name, 'file_type' : project.image.type})

    cursor.execute('''
        INSERT user_projects(
                user_id,
                project_id)
            VALUES(
                %(user_id)s,
                %(project_id)s);''',
        {'user_id': user_id, 'project_id': project.id})

    return project