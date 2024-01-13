import os
from supabase import create_client, Client

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)
  


# from flask_sqlalchemy import SQLAlchemy

# db = SQLAlchemy()


# lobby_users = db.Table('lobby_users',
#                        db.Column('lobby_id', db.Integer, db.ForeignKey('lobby.id'), primary_key=True),
#                        db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
#                        )

# class User(db.Model):
#   id = db.Column(db.Integer, primary_key=True)
#   email = db.Column(db.String(50), unique=True, nullable=False)


# class Lobby(db.Model):
#   id = db.Column(db.Integer, primary_key=True)
#   hash = db.Column(db.String(6), unique=True, nullable=False)
#   users = db.relationship('User', secondary=lobby_users, lazy='subquery',
#                             backref=db.backref('lobbies', lazy=True))
<<<<<<< HEAD:my-react-extension/server/models.py
#   created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
=======
#   created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
>>>>>>> 0a147bf9 (finished api endpoints for creating a user, creating a lobby, joining a lobby):server/models.py
