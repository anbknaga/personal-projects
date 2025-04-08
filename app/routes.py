from flask import render_template, request, jsonify
import requests
from flask import current_app
from flask import Blueprint

routes = Blueprint('routes', __name__)

@routes.route('/')
def index():
    return render_template('index.html')

@routes.route('/check_peppol', methods=['POST'])
def check_peppol():
    identifier = request.form.get('identifier')
    scheme = request.form.get('scheme')
    environment = request.form.get('environment', 'sandbox')  # Get environment selection
    
    # Select API key and URL based on environment
    if environment == 'production':
        api_key = current_app.config['PRODUCTION_API_KEY']
        base_url = current_app.config['PRODUCTION_BASE_URL']
    else:
        api_key = current_app.config['SANDBOX_API_KEY']
        base_url = current_app.config['SANDBOX_BASE_URL']
    
    try:
        response = requests.post(
            f"{base_url}/discovery/exists",
            headers={
                'Authorization': f"Bearer {api_key}",
                'Content-Type': 'application/json'
            },
            json={
                'identifier': identifier,
                'scheme': scheme,
                'network': 'peppol',
                'metaScheme': 'iso6523-actorid-upis'
            }
        )
        return jsonify(response.json())
    except Exception as e:
        return jsonify({'error': str(e)}), 500