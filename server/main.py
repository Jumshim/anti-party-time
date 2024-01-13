from flask import Flask
from server.config import Config
from server.routes import main

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    app.register_blueprint(main)

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)