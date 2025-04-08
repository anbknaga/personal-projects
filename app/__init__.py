from flask import Flask
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Register the blueprint
    from app.routes import routes as routes_blueprint
    app.register_blueprint(routes_blueprint)
    
    return app