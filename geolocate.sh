set -e

while read -r var
do
  wget -q -O /tmp/a "https://maps.googleapis.com/maps/api/geocode/json?region=ch&address=$var"
  lat=$(cat /tmp/a | jq -r '.results[0].geometry.location.lat')
  lon=$(cat /tmp/a | jq -r '.results[0].geometry.location.lng')
  echo $var,$lat,$lon
done

