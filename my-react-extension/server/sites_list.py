from supabase import create_client
from models import supabase
#from server.models import supabase
from flask import Blueprint, request, jsonify

supabase_url = ""
supabase_key = ""

#supabase = create_client(supabase_url, supabase_key)


data = {'website_url': 'website_key', 'unique_key': unique_key}
supabase.table('your_table_name').upsert(data, ['website_url'])

