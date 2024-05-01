import csv
import json
import sys
import io
import os

input = io.TextIOWrapper(sys.stdin.buffer, encoding='utf-8-sig')

collectionGroups = {}

reader = csv.DictReader(input)


if not os.path.exists("../src/content/item"):
    os.mkdir("../src/content/item")

if not os.path.exists("../src/content/collection-group"):
    os.mkdir("../src/content/collection-group")

for row in reader:
    if("archive.org" in row["Permalink"]):
        ia = True
        identifier = "ia--" + row["Permalink"].split("details/")[-1].split("/")[0]
        
    else:
        ia = False
        identifier = row["Permalink"].split("/")[-1]
        if("commonwealth" not in identifier):
            identifier = "commonwealth:" + identifier
        identifier = identifier.replace(":","--")

    itemType = "internetArchive" if ia else "digitalCommonwealth" 

    recordEntry = {
        "itemType": itemType,
        "tags": row["Tags/Subjects"].split(", ")
    }
    
    with open("../src/content/item/" + identifier + ".json", "w+") as outfile:
        json.dump(recordEntry, outfile)

    for group in row["Website Collection Groups"].split(", "):
        if group in collectionGroups:
            collectionGroups[group].append(identifier)
        else:
            collectionGroups[group] = [identifier]

    for (k,v) in collectionGroups.items():
        record = {
            "title": k,
            "description": "",
            "items": v,
            "featured": v[0]
        }
        with open("../src/content/collection-group/" + k.lower().replace(" ","-").replace("/","-") + ".json", "w+" ) as outfile:
            json.dump(record, outfile)

        
        
         


