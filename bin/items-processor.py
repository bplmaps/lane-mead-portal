import csv
import json
import sys
import io
import os

input = io.TextIOWrapper(sys.stdin.buffer, encoding='utf-8-sig')

collectionGroups = {}

reader = csv.DictReader(input)


if not os.path.exists("../src/content/item"):
    os.mkdir("../src/content/items")

if not os.path.exists("../src/content/item-collections"):
    os.mkdir("../src/content/item-collections")

for row in reader:
    if("archive.org" in row["Permalink"]):
        ia = True
        id = "ia--" + row["Permalink"].split("details/")[-1].split("/")[0]
        
    else:
        ia = False
        id = row["Permalink"].split("/")[-1]
        if("commonwealth" not in id):
            id = "commonwealth:" + id
        id = id.replace(":","--")

    itemType = "internetArchive" if ia else "digitalCommonwealth" 

    recordEntry = {
        "itemType": itemType,
        "tags": row["Tags/Subjects"].split(", ")
    }
    
    with open("../src/content/items/" + id + ".json", "w+") as outfile:
        json.dump(recordEntry, outfile)

    for group in row["Website Collection Groups"].split(", "):
        if group in collectionGroups:
            collectionGroups[group].append(id)
        else:
            collectionGroups[group] = [id]

    for (k,v) in collectionGroups.items():
        record = {
            "title": k,
            "description": "",
            "items": v,
            "featured": v[0]
        }
        with open("../src/content/item-collections/" + k.lower().replace(" ","-").replace("/","-") + ".json", "w+" ) as outfile:
            json.dump(record, outfile)

        
        
         


