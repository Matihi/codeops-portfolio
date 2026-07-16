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


    
customers_in_premium_tier = 0
customers_in_standard_tier = 0
customers_in_basic_tier = 0

for _, balance in customers:
    if balance >= 1000:
        customers_in_premium_tier += 1
    elif balance >= 500:
        customers_in_standard_tier += 1
    else:
        customers_in_basic_tier += 1

    
print(f"\nNumber of customers in Premium tier: {customers_in_premium_tier}")
print(f"Number of customers in Standard tier: {customers_in_standard_tier}")
print(f"Number of customers in Basic tier: {customers_in_basic_tier}")