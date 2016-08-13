from flask import send_file
from client import client_side

#path to client side site folder
client_url = "client/"


#Route For Client Side Resources (JS, CSS, Non-DB Images, etc)
@client_side.route('/res/<path:resource_path>')
def res(resource_path):
    if ".." not in resource_path: 
        return send_file(client_url +resource_path)
    return False


#Routes For Web Pages

#Main Agility Page
@client_side.route('/')
@client_side.route('/home')
@client_side.route('/card/<card_id>')
@client_side.route('/create/card/<card_type>')
@client_side.route('/list/epics')
@client_side.route('/list/sprint/current')
@client_side.route('/list/backlog')
@client_side.route('/list/archive')
@client_side.route('/select/project')
@client_side.route('/create/project')
@client_side.route('/login')
def initial_page(*args, **kwargs):
    return send_file(client_url +'site/index.html')