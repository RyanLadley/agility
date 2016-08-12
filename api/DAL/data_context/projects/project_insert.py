from api.DAL.data_context.database_connection import DatabaseConnection

@DatabaseConnection
def create_project(project, cursor = None):

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

    return project