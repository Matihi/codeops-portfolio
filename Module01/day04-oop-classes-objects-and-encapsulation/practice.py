#Book Class

print("****Book Class****\n")
class Book:
    def __init__(self,title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages
    def describe(self):
        print(f"A book with title {self.title}, author {self.author} and number of pages {self.pages}")

biology = Book("Microbiology", "Abebe", 572)
math = Book("Calculus", "Kebede", 359)

biology.describe()
math.describe()

#Product Class, Private attribute and Validate
print("\n****Product Class****\n")
class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.__quantity = quantity

    @property
    def quantity(self):
        return self.__quantity

    def restock(self, quantity):
        if quantity < 0:
            print("Negative numbers are not allowed")
        else:
            self.__quantity = self.quantity + quantity
    def sell(self, quantity):
        if quantity < 0:
            print("Negative numbers are not allowed")
        elif self.quantity - quantity < 0:
            print(f"Trying to sell {quantity} apples, available {self.quantity}") # when we use self.quantity we are using the getter method
        else:                                                                     # which returns self.__quantity attribute
            self.__quantity = self.quantity - quantity

apple = Product("Apple", 800, 5)   
orange = Product("Orange", 200, 15)
banana = Product("Banana", 300, 10)

print(apple.name)
print(orange.name)
print(banana.name)

print()

orange.name = "Avocado"

print(apple.name)
print(orange.name)
print(banana.name)


print(apple.quantity)               
apple.sell(3)
print(apple.quantity)
apple.restock(10)
print(apple.quantity)
apple.sell(20)
print(apple.quantity)
apple.sell(-2)
apple.restock(-5)
apple.sell(12)
print(apple.quantity)




        