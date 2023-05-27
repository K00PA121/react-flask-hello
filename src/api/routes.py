from flask import Blueprint
from api.modulos.users import user_api

api_bp = Blueprint('api', __name__)
api_bp.register_blueprint(user_api)