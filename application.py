#! env/bin/python3.4
from flask import Flask, send_file

application = Flask(__name__)

#-------------------------------------#
#--------------Routes-----------------#
#-------------------------------------#
from client import client_side
import client.routes

application.register_blueprint(client_side)

from api.core.pages import page
import api.core.pages.home_page
import api.core.pages.card_creation_page

application.register_blueprint(page, url_prefix='/api/page')

from api.core.workflow import workflow
import api.core.workflow.admin_workflow
import api.core.workflow.card_workflow
import api.core.workflow.epic_workflow
import api.core.workflow.sprint_workflow
import api.core.workflow.project_workflow

application.register_blueprint(workflow, url_prefix='/api')

@application.route('/image/project/<path:resource_path>')
def send_project_image(resource_path):
    
    if ".." not in resource_path: 
        return send_file('api/DAL/images/projects/' +resource_path)
    return False

if __name__ == "__main__":
    application.run(debug = True)
