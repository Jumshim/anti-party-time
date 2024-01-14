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
      lobby_hash = generate_hash()
      #Creating the lobby
      response = supabase.table('lobbies').insert({"hash": lobby_hash}).execute()
      lobby = response.data[0]

      if user_email:
        user = get_user(user_email)
        if user:
           data = supabase.table('lobby_users').insert({"user_id": user['id'], "lobby_id": lobby['id']}).execute()
      return jsonify({
          "status": "success",
          "data": {"lobby_hash": lobby_hash}
      }), 200
    except Exception as e:
      return jsonify({
         "status": "error",
      }), 500
    

# i want to get something like this
# [
#    {
    #    user_id: {
    #       name: "",
    #       email: "",
    #       sites: {
    #          "yt.com" : 0,
    #          "fb.com" : 1
    #       }
    #    }
#    },
#    user_id: {
      
#    }
# ]

@main.route('/getsites', methods=['GET'])
def get_sites():
    try:
        data = request.get_json()
        lobby_hash = data.get('hash')
        response = supabase.table('lobbies').select('sites').eq('hash',hash).execute()
        siteList = response.data[0]["sites"]

        return jsonify({
          "status": "success",
          "data": siteList
        }), 200

    except Exception as e:
       return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
    
@main.route('/tracklobby', methods=['GET'])
def track_lobby():
    try:
        data = request.get_json()
        lobby_hash = data.get('hash')
        lobby_id = supabase.table('lobbies').select('id').eq('hash', hash).execute().data[0]["id"]
        response = supabase.table('lobby_users').select('user_id').eq('lobby_id', lobby_id).execute().data
        users = [item['user_id'] for item in response]

        #[1,2,3]

        finalResponse = []

        for user in users:
            userData = {}
            userData[user] = {}
            userInfo = supabase.table('users').select('name', 'email').eq('id', user).execute().data
            userData[user]["name"] = userInfo[0]["name"]
            userData[user]["email"] = userInfo[0]["email"]

            sitesData = {}
            sitesResponse = supabase.table('sites_list').select('website', 'time_spent').eq('user_id', user).execute().data
            for site in sitesResponse:
                sitesData[site['website']] = site['time_spent']

            userData[user]["sites"] = sitesData

            finalResponse.append(userData)
        return jsonify({
          "status": "success",
          "data": finalResponse
        }), 200
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
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
def track_lobbi():
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


    
