#Temperature label
print("\nTemperature Label\n")
print("Type in the temperature in degree celsius")
temperature = int(input("Please enter the temperature: "))
if temperature < 15:
    print("cold")
elif temperature > 15 and temperature < 28:
    print("warm")
else:
    print("hot")



#Print Receipts
print("\n\nPrint Receipts from 1 to 10")
for receipt in range(1,11):
    print(f"Receipt #{receipt}")



#Even Numbers
print("\n\nprint even numbers from 1 to 20")
number = 1
while(number < 21):
    if (number % 2) == 0:
        print(number)
    number = number + 1



#Discount Function
print("\n\nPrint price after discount")
price = 25
discount_percentage = 4.5
def apply_discount(price, percent = 10):
    discount_price = price - (price * (percent / 100))
    return discount_price


print(f"The price after discount is applied for birr {price} is {apply_discount(price, discount_percentage)}")


#Countdown
print("\n\nCountdown from 5")
counter = 5
while(counter > -1):
    if counter == 0:
        print("Liftoff!")
        break
    print(counter)
    counter = counter - 1


