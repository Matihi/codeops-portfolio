#Tip calculator


print("\n*****Tip Calculator*****\n")

total_bill = float(input("Enter the total amount: "))
number_of_people = int(input("\nEnter the number of people: "))
tip_rate = input("\nEnter the tip rate in percentage, press Enter for default(10%): ")

if tip_rate == "":
    tip_rate = 10
else:
    tip_rate = float(tip_rate)

tip_rate = tip_rate / 100

print()

def split_bill(total, people, tip_rate=0.10):
    personal_share = (total + (total * tip_rate)) / people
    return personal_share


people = []

count = number_of_people
start = 1

print("Please enter the names of the people\n")

while count > 0:
    names = input(f"{start} Enter the name : ")
    people.append(names)
    count -= 1
    start += 1

print()

for person in people:
    print(f"{person} needs to pay {split_bill(total_bill, number_of_people, tip_rate):.2f} Birr")
