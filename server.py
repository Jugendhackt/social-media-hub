from flask import Flask, request, jsonify
import random
import string
import requests
import mysql.connector

app = Flask(__name__)
sessions = {}  # Session tokens store here

mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd=""
    )


def insert_user(user,mail,pw):  # Debug function to add a user to database
    mycursor = mydb.cursor()

    sql = "INSERT INTO socialhub.users (username, mail, password) VALUES (%s, %s, %s)"
    val = (user, mail, pw)
    mycursor.execute(sql, val)
    mydb.commit()


def getcorrect(user, pw):   # Returns exact 1 result if the credentials are correct
    mycursor = mydb.cursor()

    mycursor.execute("SELECT * FROM socialhub.users WHERE username='" + user + "' AND password='" + pw + "';")

    myresult = mycursor.fetchall()

    return myresult


@app.route('/login', methods=['post'])  # /login    POST    needs username and password     returns session-token
def login():
    user = request.form['user']
    pw = request.form['pw']
    correct = getcorrect(user, pw)
    if len(correct) == 1:
        code = randomString()
        sessions[code] = user
        out = {"error": False, "code": code}
        return jsonify(out)
    else:
        out = {"error": True, "msg": "Wrong Credentials"}
        return jsonify(out)


@app.route('/settings', methods=['post'])
def settings():
    action = request.form['action']

    if action == "logout":
        token = request.form['token']
        if token in sessions:
            del sessions[token]
            out = {"error": False}
            return jsonify(out)
        out = {"error": True}
        return jsonify(out)


@app.route('/timeline', methods=['post'])
def timeline():
    token = request.form['token']
    if token == None:
        old = {"error": True, "msg": "No Auth Code"}
        return jsonify(old)
    user = sessions[token]

    mycursor = mydb.cursor()

    mycursor.execute("SELECT * FROM socialhub.users WHERE username='" + user + "'")

    myresult = mycursor.fetchall()
    if len(myresult) == 1:
        reddit = myresult[0][4]
        print(reddit)
        output = {}
        data = {
            'grant_type': 'authorization_code',
            'redirect_uri': 'http://151.216.2.181:5000/networks/reddit',
            'code': reddit
        }
        heads = {
            'User-Agent': 'Mozilla/5.0 (X11; Linux i686; rv:64.0) Gecko/20100101 Firefox/64.0',
            'Authorization': 'Basic djd2NnVvcC1KU1dJVFE6UTQ2NE42bDdBSHZFZVloYmMyZTg0MzlMb0Z3',
            'Accept': '*/*',
            'Cache-Control': 'no-cache',
            'Host': 'www.reddit.com',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'gzip, deflate',
            'Cookie': 'loid=00000000004opjmb19.2.1569694658627.Z0FBQUFBQmRqNlBDVkcwREFXOXp4NmVReXlsNGVrU2c5VGkyUzF4Q09BandIdFpleWVmSU1EbERWbkZDTTRaLTJSSjZHdkZtell6TXFhN1Y4Um1JQ0pyemw0V0FSV0RTdEFGRjR5aHBYaFo0U0JCR3RCSGhRcjRzQ2drRVUwMzdlcUVENkQyWEViemM; edgebucket=v9NOKc3AQ7xwQfauCV',
            'Content-Length': '465',
            'Connection': 'keep-alive'
        }

        r = requests.post("https://reddit.com/api/v1/access_token", data=data, headers=heads)
        # print(r.status_code)
        json = r.json()
        print(json)
        token = json['access_token']
        print(token)
        subsheads = {
            'Authorization': 'bearer ' + token,
            'User-Agent': 'JH Hub',
            'Accept': '*/*',
            'Cache-Control': 'no-cache',
            'Host': 'oauth.reddit.com',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive'
        }
        subs = requests.get("https://oauth.reddit.com/subreddits/mine/subscriber", headers=subsheads)
        subs = subs.json()
        print(subs)

        subreddits = subs['data']['children']
        usedreddits = {}
        header = {
            'User-Agent': 'JH Hub'
        }
        for subreddit in subreddits:

            if subreddit['data']['url'].startswith('/r'):
                # print(subreddit['data']['url'])
                usedreddits[len(usedreddits)] = subreddit['data']['url']
        for rddtd in usedreddits:
            r = requests.get('http://www.reddit.com' + usedreddits[rddtd] +'new.json?sort=new', header)
            r = r.json()


            try:
                list = r['data']['children']
                print(list)
                for x in list:
                    x = x['data']
                    output[len(output)]['plattform'] = "reddit"
                    output[len(output)]['id'] = x['id']
                    output[len(output)]['user'] = x['name']
                    output[len(output)]['subreddit'] = x['subreddit_name_prefixed']
                    output[len(output)]['title'] = x['title']
                    output[len(output)]['img'] = x['url']
            except:
                print("empty")
            return jsonify(output)
    else:
        old = {"error": True, "msg": "Internal Error: No Entry"}
        return jsonify(old)


def addaccount(user, network, token):
    mycursor = mydb.cursor()
    sql = "UPDATE socialhub.users SET " + network + "='" + token + "' WHERE username='" + user + "'"
    mycursor.execute(sql)
    mydb.commit()


@app.route('/networks/<network>', methods=['get'])
def networks(network):
    if network == "reddit":
        addaccount(request.args['state'], network, request.args['code'])
        return "TRUE"


@app.route('/')
def index():
    return 'Jugend Hackt!'


def randomString(stringLength=10):
    """Generate a random string of fixed length https://pynative.com/python-generate-random-string/"""
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringLength))


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
