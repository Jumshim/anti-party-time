from flask import Blueprint, request, jsonify
from server.models import supabase
import random
import string

main = Blueprint('main', __name__)

@main.route('/user', methods=['POST'])
def create_user():
   data = request.get_json()
   data = supabase.table('users').insert({"email": data.get('email')}).execute()
   return jsonify({"message": f"User added successfully"}), 201

def get_user(user_email):
   response = supabase.table('users').select('*').eq('email', user_email).execute()
   return response.data[0]

@main.route('/', methods=['GET'])
def ping():
   return jsonify({"message": f"hello"}), 201

def generate_hash():
    hash = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    response = supabase.table('lobbies').select('*').eq('hash', hash).execute()
    if response.count == None:
      return hash
    else: return Exception


@main.route('/lobby', methods=['GET'])
def create_lobby():
    try:
      data = request.get_json()

      #pulling the user id

      user_email = data.get('user_email')
      sites = data.get('sites')
      lobby_hash = generate_hash()
      #Creating the lobby
      response = supabase.table('lobbies').insert({"hash": lobby_hash}).execute()
      lobby = response.data[0]

      if user_email:
        user = get_user(user_email)
        if user:
           data = supabase.table('lobby_users').insert({"user_id": user['id'], "lobby_id": lobby['id'], "sites": sites}).execute()
      return jsonify({
          "status": "success",
          "data": {"lobby_hash": lobby_hash}
      }), 200
    except Exception as e:
      return jsonify({
         "status": "error",
      }), 500

@main.route('/lobby', methods=['POST'])
def join_lobby():
    try:
      data = request.get_json()
      lobby_hash = data.get('hash')
      user_email = data.get('user_email')

      response = supabase.table('lobbies').select('*').eq('hash', lobby_hash).execute()
      lobby = response.data[0]
      if lobby and user_email:
          user = get_user(user_email)
          response = supabase.table('lobby_users').select('*').eq('user_id', user['id']).eq('lobby_id',lobby['id']).execute()
          if response.count == None:
            data = supabase.table('lobby_users').insert({"user_id": user['id'], "lobby_id": lobby['id']}).execute()
            return jsonify({
                "status": "success",
                "message": "Successfully joined the lobby."
              }), 200
          else:
             return jsonify({
                "status": "error", 
                "message": "User already in the lobby."
              }), 400
      else:
          return jsonify({
            "status": "error",
            "message": "Invalid lobby invite code."
          }), 404
    except Exception as e:
       return jsonify({
          "status": "error",
          "message": str(e)
       }), 500
    
@main.route('/site', methods=['POST'])
def track_lobby():
   data = request.get_json()
   #user_id = data.get('user_id')
   #time_spent = data.get('time_spent')

   print(data)

   website_url = data.get('website')
   #t_spent = data.get('') Do this later once the data is pulled out of the google dev space
   # visit_time = datetime.datetime.now().isoformat()

   data = {'website': website_url}
   supabase.table('sites_list').insert(data)



   return f'Successfully tracked visit to {website_url}'

@main.route('/users', methods=['POST'])
def create_user2():
   try:
        data = request.get_json()
        user_email = data.get('user_email')
        #user_id = data.get('id')

        # Check if email and id are provided
        if not user_email:
            return jsonify({"status": "error", "message": "Email and ID are required"}), 400
        # Check if the user already exists
        existing_user = supabase.table('users').select('*').eq('user_email', user_email).execute().data
        if existing_user:
           return jsonify({"status": "error", "message": "User with the provided ID already exists"}), 409

        response = supabase.table('users').insert({"user_email": user_email, "id": user_id}).execute()
        user = response.data[0]

        return jsonify({"status": "success", "data": {"user": user}}), 200
   except Exception as e:
      return jsonify({
          "status": "error",
          "message": str(e)
       }), 500

@main.route('/sites_list', methods=['POST'])
def watch_times():
   try:
        data = request.get_json()
        user_email = data.get('user_email')
        user = get_user(user_email)
        user_id = user['id']
        lobby_hash = data.get('hash')
        website = data.get('website')
        time_spent = data.get('time_spent')

        lobbyIdResponse = supabase.table('lobbies').select('id').eq('hash', lobby_hash).execute()
        lobby_id = lobbyIdResponse.data[0]['id']

        if not time_spent:
            return jsonify({"status": "error", "message": "User ID, Lobby ID, Website, and Time Spent are required"}), 400
        
        existing_user = supabase.table('users').select('*').eq('email', user_email).execute().data
        if not existing_user:
            return jsonify({"status": "error", "message": "User with the provided ID does not exist"}), 404

        # Update watch times 

        conflictFields = ['id', 'website']

        response = supabase.table('sites_list').upsert(
            {"id": user_id, "lobby_id": lobby_id, "website": website, "time_spent": time_spent},
            on_conflict=conflictFields).execute()

        return jsonify({"status": "success", "message": f"Successfully updated watch times for user {user_id}"}), 200
   except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

   
    
