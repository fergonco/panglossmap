import fileinput
import sys, json
import urllib.request

def parseInitialCSV():
    towns = {}
    with open("coordinates.csv") as f:
        for line in f:
            (key, val) = line.split("|")
            key = key.strip()
            val = val.strip()
            if (val != "null,null"):
                towns[key] = val

    json.dump(towns, open ("towns.json", "w"))

with open('apikey', 'r') as content_file:
    apikey = content_file.read().strip()
print(apikey)

towns = json.load(open("towns.json"))
#print(json.dumps(towns, indent=4))

for line in fileinput.input():
    line = line.strip()
    if line == "?":
        continue;
    print("processing " + line)
    if line not in towns:
        line = line.strip()
        url = "https://maps.googleapis.com/maps/api/geocode/json?region=ch&address=" + line + "&key=" + apikey
        print("querying " + url)
        response = urllib.request.urlopen(url)
        responseContent = response.read()
        responseJSON = json.loads(responseContent)
        try:
            location = responseJSON["results"][0]["geometry"]["location"]
            print(location)
            towns[line] = str(location["lat"]) + "," + str(location["lng"])
            json.dump(towns, open("towns.json", "w"))
        except Exception:
            print(json.dumps(responseJSON, indent=4))
            raise


