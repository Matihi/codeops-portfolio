#Customer Report

customers = [("Almaz", 1500), ("Dawit", 700), ("Tigits", 200), ("Hanna", 1200), ("Samuel", 450)]

# if len(customers) == 0:
#     print("List is empty")

print("Customer Report Program")
print("Enter the customer's name and telebirr balance")

stop_loop = False
while(not stop_loop):
    command = input("\nEnter Q to quit, enter any other character to continue: ")
    if (command == "Q" or command == "q"):
        stop_loop = True
        break
    customer_name = input("\nInput the customer name: ")
    customer_balance = int(input("Input customer's telebirr balance: "))
    customers.append((customer_name, customer_balance))


def tier(balance):
    if balance >= 1000:
        return "Premium"
    elif balance >= 500:
        return "Standard"
    return "Basic"

for name, balance in customers:
    print(f"\n{name}: {tier(balance)} ({balance}) ETB")


def tier_count(tier_type):
    counter = 0
    if tier_type == 1:
        for _, balance in customers:
            if balance >= 1000:
                counter += 1
        return counter

    if tier_type == 2:
        for _, balance in customers:
            if balance >= 500 and balance < 1000:
                counter += 1
        return counter
    

    if tier_type == 3:
        for _, balance in customers:
            if balance < 500:
                counter += 1
        return counter
    
    
print(f"Number of customers in Premium tier: {tier_count(1)}")
print(f"Number of customers in Standard tier: {tier_count(2)}")
print(f"Number of customers in Basic tier: {tier_count(3)}")