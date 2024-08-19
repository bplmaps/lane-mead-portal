import csv
import json
import sys
import io
import os

input = io.TextIOWrapper(sys.stdin.buffer, encoding='utf-8-sig')

reader = csv.DictReader(input)


for row in reader:
    id = row["id"]
    description = row["Description"]

    try:
        with open("../src/content/item-collections/" + id + ".json", 'r') as inFile:
            j = json.load(inFile)
        
        j["description"] = description

        print(j)

        with open("../src/content/item-collections/" + id + ".json", 'w') as outFile:
            json.dump(j, outFile)
        
    except:
        print(f'Could not find collection {id}')  