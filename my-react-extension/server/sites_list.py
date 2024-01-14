from supabase import create_client
from models import supabase
#from server.models import supabase
from flask import Blueprint, request, jsonify

supabase_url = ""
supabase_key = ""

#supabase = create_client(supabase_url, supabase_key)


data = {'website': 'website_url'}
supabase.table('sites_list').upsert(data, ['website'])

