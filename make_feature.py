import json

d = json.load(open("public/top.json"))

for i in range(len(d)):
    for j in range(len(d[i]["items"])):
        # print(d[i]["items"][j]["product"]["description"])
        d[i]["items"][j]["product"]["description"] = ""

json.dump(d, open("features.json", "w"), ensure_ascii=False)
