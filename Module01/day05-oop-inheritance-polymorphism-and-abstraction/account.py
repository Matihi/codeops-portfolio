#Account Management System

class Account:
    def __init__(self, owner, account_number, balance = 0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance

    def deposite(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.__balance += amount  #If we had a setter method as well and it was like this: self.balance = self.balance + amount it means
                                                                                 #then calls the setter method second =  calls the getter method first + amount(adds amount)
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        elif self.balance < amount:
            raise ValueError("Balance not sufficient")
        else:
            self.__balance -= amount

    def statement(self):
        print(f"Owner {self.owner} with account number {self.account_number} has balance {self.balance} ETB")



        