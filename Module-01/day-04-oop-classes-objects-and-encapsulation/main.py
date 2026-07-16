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



account1 = Account("Abebe", "123456", 2500)
account1.statement()
account1.deposite(150)
account1.statement()
account1.withdraw(700.5)
account1.statement()
print()
print(account1.balance)
# account1.balance = 2645
print(account1.balance)
account1.statement()
account1.__balance = 1500
account1.statement()
# account1.deposite(-200)
# account1.statement()
# account1.withdraw(-55)
# account1.statement()
account1.withdraw(2351)
print()
account2 = Account("Kebede", "789012", 3455)
account2.deposite(10)
account1.statement()
account2.statement()
        