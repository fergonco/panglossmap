tail -n +2 member-towns.csv | cut -d, -f2 | iconv -f utf8 -t ascii//TRANSLIT | tr A-Z a-z | sort -u
