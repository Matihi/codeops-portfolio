#Exercises

import io

#Unique cities
cities = ["Addis Ababa", "Bahir Dar", "Hawassa", "Ambo", "Mekelle", "Asosa", 
            "Arba Minch", "Harrar", "Gondor", "Adama", "Addis Ababa", "Hawassa", 
            "Hawassa", "Arba Minch", "Gondor", "Semera", "Gambella city", "Ambo", "Mekelle"]


unique_cities = set(cities)
print("\n*****Unique Cities*****")
print("\nThe unique cities from the list of cities are:\n")

for city in unique_cities:
    print(city)

print(f"\nNumber of unique cities: {len(unique_cities)}")


#Price Report
print("\n*****Price Report*****\n")
grocery_items = {"Sugar":500, "Potatoes":300, "tea":134, "tomatoes":140, "meat":950}

for items,price in grocery_items.items():
    print(f"{items}: {price}")


#Tax Comprehension
prices = [100, 250, 400, 80]
#15% tax
price_with_tax = [p * 1.15 for p in prices]

#Cheap Items
cheap = [p for p in prices if p < 200]


#Write and Read
print("\n*****Write and Read*****\n")
file_path = "names.txt"
try:
    with open(file_path, "w") as name_file:
        name_file.write("Abebe,Kebede,Almaz") #If space is added between names, it will show when you write to the file

except io.UnsupportedOperation:
    print("UnsupportedOperation: No write access")
else:
    print("Data written successfully")
finally:
    print("Operation Done")

names = []


try:
    with open(file_path, "r") as read_file:
        for line in read_file:
            name = line.strip().split(",")
        names = name
except FileNotFoundError:
    print("FileNotFoundError: File does not exist")
else:
    print("File read successfully")
finally:
    print("Operation Done")


try:
    with open(file_path, "w") as write_file:
        for name in names:
            write_file.write(f"{name}\n")
except io.UnsupportedOperation:
     print("UnsupportedOperation: No write access")
else:
    print("Data written successfully")
finally:
    print("Operation Done")



#Safe Division
print("\n*****Safe Division*****\n")
dividend = 1000
while True:
    try:
        divisor = float(input("Give a number to divide 1000: "))
        print(f"{dividend} divided by {divisor} is {dividend / divisor}")
    except ValueError:
        print("Please enter a numeric value")
    except ZeroDivisionError:
        print("Division by zero error. Please enter another number")
    else:
        break







