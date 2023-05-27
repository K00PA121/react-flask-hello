from flask_jwt_extended import jwt_required, create_access_token, create_refresh_token
from flask import Blueprint, jsonify, request
from werkzeug.security import check_password_hash, generate_password_hash
from api.models import db, User
from api.utils import generate_sitemap

user_api = Blueprint('user_api', __name__, url_prefix='/users')

@user_api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password required'}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({'error': 'Invalid email or password'}), 400

    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)
    return jsonify({'message': 'Login successful', 'id': user.id, 'access_token': access_token, 'refresh_token': refresh_token}), 200

@user_api.route('/signup', methods=['POST'])
def create_user():
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No data provided'}), 400

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password required'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'An account with this email already exists'}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully', 'id': new_user.id}), 201

