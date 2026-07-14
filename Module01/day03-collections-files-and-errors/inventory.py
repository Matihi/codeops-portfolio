#Pharmacy Inventory Tracker

import io


print("\n*****Pharmacy Inventory Tracker*****\n")

stock = {}
file_path = "stock.txt"

try:
    with open(file_path, "r") as stock_file:
        for line in stock_file:
            item, quantity = line.strip().split(",")
            stock[item] = int(quantity)
except FileNotFoundError:
    print("FileNotFoundError: File does not exist")
else:
    print("Data read successfully")
finally:
    print("Operation Done")

def adjust_quantity(item, amount):
    if stock.get(item) == None:
        if amount <= 0:
            print(f"Decreasing {-amount} unit(s) from nonexistent item:{item}")
        else:
            stock[item] = stock.get(item, 0) + amount
    elif amount < 0:
        if stock[item] + amount < 0:
            print(f"Insufficient stock! Available stock for {item}:{stock[item]} Requested: {-amount}")
        else:
            stock[item] = stock[item] + amount
    else:    
        stock[item] = stock[item] + amount

low_stock_threshold = 10

def print_low_stock():
    # low = []
    # for item, quantity in stock.items(): # both this for loop and the list comprehension are functionally identical
    #     if quantity < low_stock_threshold:
    #         low.append(item)
    
    low = [item for item, quantity in stock.items() if quantity < low_stock_threshold]

    print("\nItems with low quantity(below 10)\n")
    for item in low:
        print(f"{item}")
    print()

def update_file():
    try:
        with open(file_path, "w") as update_stock_file:
            for item, quantity in stock.items():
                update_stock_file.write(f"{item},{quantity}\n")

    except io.UnsupportedOperation:
        print("UnsupportedOperation: No write access")
    else:
        print("Data written successfully")
    finally:
        print("Operation Done")

print("\nBefore adjusting")
print_low_stock()
adjust_quantity("Paracetamol", -5)
adjust_quantity("Toothbrush", -10)
adjust_quantity("Ibuprofen", 3)
adjust_quantity("Ibuprofen", -9)
adjust_quantity("Aspirin", -5)
adjust_quantity("Vitamin C", 6)
adjust_quantity("Sanitizer", 3)

print("\nAfter Adjusting")
print_low_stock()
update_file()
