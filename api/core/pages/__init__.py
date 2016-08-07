from flask import Blueprint

#page is simply a wrapper of multiple api calls for the website pages
#this reduces the number of http requests back to the server
#accessed using url /api/page/<request>

page = Blueprint('page', __name__)