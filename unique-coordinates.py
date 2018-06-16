import json

towns = json.load(open("towns.json"))
l = list(towns.values())
for i in l:
    values = i.split(',')
    print("[" + values[1] + "," + values[0] + "],")
