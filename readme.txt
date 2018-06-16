1. update member-towns.csv
2. ./unique-towns.sh | python3 geolocate.py
   Now towns.json contains the pairs town/coordinate
4. python3 unique-coordinates.py | sort -u
