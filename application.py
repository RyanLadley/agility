#! env/bin/python3.4
from flask import Flask, send_file, request

application = Flask(__name__)


#-------------------------------------#
#--------------Routes-----------------#
#-------------------------------------#

#___________Client Side____________#


#path to client side site folder
client_url = "client/"


#Route For Client Side Resources (JS, CSS, Non-DB Images, etc)
@application.route('/res/<path:resource_path>')
def res(resource_path):
    if ".." not in resource_path: 
        return send_file(client_url +resource_path)
    return False


#Routes For Web Pages

#Main The Lounge page
@application.route('/')
def initial_page(*args, **kwargs):
    return send_file(client_url +'site/index.html')

if __name__ == "__main__":
    application.run(debug = True)