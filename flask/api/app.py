import os
import redis
import time
from flask_cors import CORS
from flask import Flask, json, jsonify, Response, request

app = Flask(__name__)
CORS(app)
db = redis.Redis('redis') 
ttl = 31104000
app_name = '/api'
app_version = '/v1'
base_route = app_name+app_version

# creates a new tweet
# @param user : the owner of the tweet
# @param message: the tweet
@app.route(base_route+'/tweet', methods=['POST'])
def setTweet():
    req_data = request.get_json()
    status= 'ok'
    message= 'Tweet sent succesfully'
    if 'message' not in req_data or not req_data['message']:
        status ='error'
        message='ERROR: You should specify the content of your tweet'
    elif 'user' not in req_data or not req_data['user']:
        status='error'
        message='ERROR: You should specify the user'
    else:
       tweet_message = req_data['message']
       tweet_user = req_data['user']
       tweet_id = int(time.time())
       tweet = {
           "id":tweet_id,
           "user": tweet_user,
           "message": tweet_message,
           }
       db.set('tweet_user:'+tweet_user+':%d' % tweet_id,json.dumps(tweet))
       db.expire(tweet_id,ttl)
    data = {
        'status': status,
        'message': message
        }
    js = json.dumps(data)
    response = Response(response=js,
                    status=200,
                    mimetype="application/json")
    return response
#returns all the tweets found
@app.route(base_route+'/tweet', methods=['GET'])
def getTweets():
    path = 'tweet_user:'
    tweets ='['
    for key in db.scan_iter(path+'*'):
    	tweet = db.get(key)
    	tweets = tweets + tweet.decode('utf-8') +','
    tweets = tweets + ']'
    tweets = tweets.replace(",]", "]")
    response = Response(response=tweets,
                    status=200,
                    mimetype="application/json")
    return response

#returns the tweets of the user specified
@app.route(base_route+'/tweet/<user>', methods=['GET'])
def getTweet(user):
    path = 'tweet_user:%s' % user
    tweets ='['
    for key in db.scan_iter(path+'*'):
    	tweet = db.get(key)
    	tweets = tweets + tweet.decode('utf-8') +','
    tweets = tweets + ']'
    tweets = tweets.replace(",]", "]")
    response = Response(response=tweets,
                    status=200,
                    mimetype="application/json")
    return response

@app.errorhandler(404)
def not_found(error=None):
    message = {
            'status': 404,
            'message': 'Not Found: ' + request.url,
    }
    resp = jsonify(message)
    resp.status_code = 404
    return resp

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)