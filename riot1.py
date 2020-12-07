
import cassiopeia as cass
from flask import render_template, request, redirect, abort, flash, session, url_for, g
from flask import Flask, jsonify
from flask_cors import CORS
import json
import matplotlib.pyplot as plt
import math
cass.set_riot_api_key("RGAPI-6d23cbd0-1a6e-4f45-a4b7-f2d2bfc4390d")
app = Flask(__name__)
app.secret_key = 'bottom-secret'
CORS(app)
@app.route('/search', methods= ['POST'])
def home():
	dict = {}
	
	summoners = cass.get_summoner(name = request.form.get("username"),region = request.form.get("region"))
	maxmatch = min(len(summoners.match_history),10)
	matches = summoners.match_history[:maxmatch]
	session['x'] = maxmatch
	session['username'] = request.form.get("username")
	session['region'] = request.form.get("region")
	print(summoners.to_json())
	dict['username'] = summoners.name
	dict['level'] = summoners.level
	dict['icon'] = summoners.profile_icon.url
	temp = []
	for i in matches:
		match = {}
		for j in i.participants:
			if j.summoner.name == summoners.name:
				match['champIcon'] = j.champion.image.url
				match['id'] = i.id
				match['mode'] = i.mode.value
				match['duration'] = str(i.duration)
				match['victory'] = j.team.win
				match['kda'] = str(j.stats.kills)+'/'+str(j.stats.deaths)+'/'+str(j.stats.assists)
				temp.append(match)
				break
	dict['matches'] = temp
	return jsonify({'summoner':dict})

@app.route('/loadmore', methods= ['GET'])
def loadmore():
	temp = []
	print('Loading more')
	summoners = cass.get_summoner(name = session["username"],region = session['region'])
	matchmax = min(len(summoners.match_history),session['x']+10)
	matches = summoners.match_history[session['x']:session['x']+matchmax]
	for i in matches:
		match = {}
		for j in i.participants:
			if j.summoner.name == summoners.name:
				match['champIcon'] = j.champion.image.url
				match['id'] = i.id
				match['mode'] = i.mode.value
				match['duration'] = str(i.duration)
				match['victory'] = j.team.win
				match['kda'] = str(j.stats.kills)+'/'+str(j.stats.deaths)+'/'+str(j.stats.assists)
				temp.append(match)
				break
	session['x'] += matchmax
	return jsonify({'matches':temp})
	
@app.route('/stats', methods = ['GET'])
def loadstats():
	temp = []
	dict = {}
	summoners = cass.get_summoner(name = session["username"],region = session['region'])
	numMatch = 0
	for i in summoners.match_history:
		if numMatch >=20:
			break
		print(i.gameMode.value)
		numMatch+=1

@app.route('/match/<matchid>', methods = ['GET'])
def getmatch(matchid):
	match = {}
	summoners = cass.get_summoner(name = session["username"],region = session['region'])
	print(type(matchid))
	for i in summoners.match_history:
		
		if i.id == int(matchid):
			redparticipants = []
			for j in i.red_team.participants:
				temp = {}
				temp['name'] = (j.summoner.name)
				temp['champion'] = j.champion.image.url
				temp['items'] = []
				for k in j.stats.items:
					if k is not None:
						temp['items'].append(k.image.url)
				temp['gold'] = j.stats.gold_earned
				temp['kills'] = j.stats.kills
				temp['deaths'] = j.stats.deaths
				temp['assists'] = j.stats.assists
				temp['level'] = j.stats.level
				temp['CCscore'] = j.stats.time_CCing_others
				temp['damage'] = j.stats.total_damage_dealt_to_champions
				temp['CS'] = j.timeline.frames[-1].creep_score
				if j.lane:
					temp['lane'] = j.lane.value
				redparticipants.append(temp)
			blueparticipants = []
			for j in i.blue_team.participants:
				temp = {}
				temp['name'] = (j.summoner.name)
				temp['champion'] = j.champion.image.url
				temp['items'] = []
				for k in j.stats.items:
					if k is not None:
						temp['items'].append(k.image.url)
				temp['gold'] = j.stats.gold_earned
				temp['kills'] = j.stats.kills
				temp['deaths'] = j.stats.deaths
				temp['assists'] = j.stats.assists
				temp['level'] = j.stats.level
				temp['CCscore'] = j.stats.time_CCing_others
				temp['damage'] = j.stats.total_damage_dealt_to_champions
				temp['CS'] = j.timeline.frames[-1].creep_score
				if j.lane:
					temp['lane'] = j.lane.value
				blueparticipants.append(temp)
				print(temp)
			match['mode'] = i.mode.value
			match['duration'] = str(i.duration)
			print((i.creation.humanize()))
			match['creation'] = str(i.creation)
			match['redteam'] = redparticipants
			match['blueteam'] = blueparticipants
			
			break
	
	return jsonify(match)
if __name__ == '__main__':
   app.run(debug = True)