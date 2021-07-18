#!/bin/bash -x

# cat ../lib/resources/hacker-laws-zh.md | awk -v RS="##" 'NR > 1 { print RS $0 > "temp" (NR-1); close("temp" (NR-1)) }' 

# cat ../lib/resources/hacker-laws-zh.md | awk -v RS="##" '{ print $0 > "temp" NR }' 

# sed 's/\#\#/\n&/g' ../lib/resources/hacker-laws-zh.md | split -dl1 - temp

f_trim()
{
  trimmed=$1
  trimmed=${trimmed%% }
  trimmed=${trimmed## }
  echo $trimmed
}

f_build_lang()
{
  LANG=$1
  URL=$2
  echo "building $LANG: $URL"
  LANG_PATH="assets/s/$LANG"
  mkdir -p $LANG_PATH
  # curl $URL > assets/$LANG.md
  csplit -f"$LANG_PATH/" -ks -n2 assets/$LANG.md /\#\#/ '{99}'
  LANG_FILE_COUNT=$(f_trim $(find $LANG_PATH -type f | wc -l))
  echo ",\"$LANG\":$LANG_FILE_COUNT"  >> assets/s/index.json
}

rm -rf assets/s
mkdir -p assets/s
echo '{"__":0' > assets/s/index.json


f_build_lang "en" "https://raw.githubusercontent.com/dwmkerr/hacker-laws/main/README.md"
f_build_lang "cn" "https://raw.githubusercontent.com/nusr/hacker-laws-zh/master/README.md"

echo '}' >> assets/s/index.json


# # EN
# echo "building en"
# mkdir -p assets/s/en
# # curl https://raw.githubusercontent.com/dwmkerr/hacker-laws/main/README.md > assets/en.md
# csplit -f"assets/s/en/" -ks -n2 assets/en.md /\#\#/ '{99}'

# # CN
# echo "building cn"
# mkdir -p assets/s/cn
# curl https://raw.githubusercontent.com/nusr/hacker-laws-zh/master/README.md > assets/cn.md
# csplit -f"assets/s/cn/" -ks -n2 assets/cn.md /\#\#/ '{99}'

