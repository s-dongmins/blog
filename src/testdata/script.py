target = "name"

file = open(f"fakedata/{target}", "r")
new_file = open(f"fakedata/{target}_new", "w")

for i in file.readlines():
    if len(i) < 3:
        continue
    new_file.write(f"'{i.strip()}',\n")

file.close()
new_file.close()
print("clear")
