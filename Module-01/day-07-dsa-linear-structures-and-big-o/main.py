#Account Management System

from abc import ABC, abstractmethod

class Account:
    def __init__(self, owner, account_number, balance = 0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance
        self._observers = []

    @property
    def balance(self):
        return self.__balance
    
    #we need to add this method so that withdraw of CurrentAccount can set balance, since it does
    # not have the permission to access self.__balance of Account class because we set a read-only property with no setter.
    def _change_balance(self, amount):
        self.__balance += amount

    def subscribe(self,observer):
        self._observers.append(observer)


    def _notify(self, event):
        for observer in self._observers:
            observer.update(event)

    def deposite(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self._change_balance(amount)
        self._notify(f"Deposited {amount} ETB")

    #Template pattern to separate business logic from notification
    def withdraw(self, amount):
        self._do_withdraw(amount)
        self._notify(f"Withdrew {amount} ETB")

    def _do_withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        elif self.balance < amount:
            raise ValueError("Balance not sufficient")
        else:
            self._change_balance(-amount)
            #self.__balance -= amount # if it were this, we wouldn't be able to access a private property directly
            #self.balance -= amount # if it were this, it would have thrown this: AttributeError: property 'balance' of 'CurrentAccount' object has no setter. We could create a setter if it were not a read-only property

    def statement(self):
        print(f"Owner {self.owner} with account number {self.account_number} has balance {self.balance} ETB\n")


class SavingsAccount(Account):
    def __init__(self, owner, account_number, balance=0, rate=0.05):
        super().__init__(owner, account_number, balance)
        self.rate = rate

    def add_interest(self):
        self.deposite(self.balance * self.rate)

    def statement(self):
        print(f"Savings Account: {self.owner} with account number {self.account_number} and interest rate of {self.rate} has balance {self.balance} ETB\n")


class CurrentAccount(Account):
    def __init__(self, owner, account_number, balance=0, overdraft=1000):
        super().__init__(owner, account_number, balance)
        self.overdraft_limit = overdraft


    def _do_withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        elif self.balance < amount and abs(self.balance - amount) > self.overdraft_limit:
            raise ValueError("Exceeds overdraft limit")
        else:
            self._change_balance(-amount)
    
    def statement(self):
        print(f"Current Account: {self.owner} with account number {self.account_number} and an overdraft limit of {self.overdraft_limit} has balance {self.balance} ETB\n")



class AlertService(ABC):
    @abstractmethod
    def update(self, event): ...

class SMSAlertService(AlertService):
    def update(self, event):
        print(f"[SMS notification] {event}")


class AccountFactory:
    @staticmethod
    def create(kind, owner, account_number, balance=0, rate=0.05, overdraft=1000):
        if kind == "Savings":
            return SavingsAccount(owner, account_number, balance, rate)
        elif kind == "Current":
            return CurrentAccount(owner, account_number, balance, overdraft)
        raise ValueError(f"{kind} type is unknown")
        

class AccountRegistry:
    def __init__(self):
        self.by_number = {}
        self.order = []
        self.transactions = {}

    def add(self, account):
        if account.account_number not in self.by_number:
            self.by_number[account.account_number] = account
            self.order.append(account.account_number)
        else:
            print(f"Account with account number {account.account_number} already exists")

    def find(self, account_number):
        return self.by_number.get(account_number)

    def list_all(self):
        accounts = []
        for account_number in self.order:
            if account_number in self.by_number:
                accounts.append(self.by_number[account_number])
        return accounts

    def push_transaction(self, account_number, transaction_type, amount):
        if self.transactions.get(account_number) == None:
            self.transactions[account_number] = []
        transaction_tuple = (transaction_type, amount)
        self.transactions[account_number].append(transaction_tuple)

    
    def undo_last(self, account_number):
        account = self.find(account_number)
        if account != None:
            transaction_list = self.transactions.get(account_number)
            if transaction_list:
                latest_transaction = transaction_list.pop()
                if latest_transaction[0] == "Deposit":
                    account.withdraw(latest_transaction[1])
                    print(f"{latest_transaction[0]} has been undone")
                elif latest_transaction[0] == "Withdraw":
                    account.deposite(latest_transaction[1])
                    print(f"{latest_transaction[0]} has been undone")
                else:
                    print(f"{latest_transaction[0]} is unknown")
            else:
                print("Stack is empty")
        else:
            print(f"Account with account number {account_number} does not exist")
           










abebe = AccountFactory.create("Savings", "Abebe", "12345", 2530)
kebede = AccountFactory.create("Current", "Kebede", "67890", 3400)

account_registry = AccountRegistry()
account_registry.add(abebe)
account_registry.add(kebede)
accounts = account_registry.list_all()

# for account in accounts:
#     account.statement()

returned_account = account_registry.find("12345") if account_registry.find("12345") != None else ValueError("Account does not exist")
returned_account.statement()
returned_account.subscribe(SMSAlertService())
print(account_registry.transactions)

returned_account.deposite(250)
account_registry.push_transaction("12345", "Deposit", 250)
print(account_registry.transactions)
returned_account.statement()

returned_account.deposite(100)
account_registry.push_transaction("12345", "Deposit", 100)
print(account_registry.transactions)
returned_account.statement()

returned_account.deposite(1400)
account_registry.push_transaction("12345","Deposit", 1400)
print(account_registry.transactions)
returned_account.statement()

returned_account.withdraw(350)
account_registry.push_transaction("12345","Withdraw", 350)
print(account_registry.transactions)
returned_account.statement()

returned_account.withdraw(500)
account_registry.push_transaction("12345","Withdraw", 500)
print(account_registry.transactions)
returned_account.statement()

account_registry.undo_last("12345")
print(account_registry.transactions)
returned_account.statement()

account_registry.undo_last("12345")
print(account_registry.transactions)
returned_account.statement()




returned_account2 = account_registry.find("67890") if account_registry.find("67890") != None else ValueError("Account does not exist")
returned_account2.statement()
returned_account2.subscribe(SMSAlertService())
print(account_registry.transactions)

returned_account2.deposite(250)
account_registry.push_transaction("67890", "Deposit", 250)
print(account_registry.transactions)
returned_account2.statement()

returned_account2.deposite(100)
account_registry.push_transaction("67890", "Deposit", 100)
print(account_registry.transactions)
returned_account2.statement()

returned_account2.deposite(1400)
account_registry.push_transaction("67890","Deposit", 1400)
print(account_registry.transactions)
returned_account2.statement()

returned_account2.withdraw(350)
account_registry.push_transaction("67890","Withdraw", 350)
print(account_registry.transactions)
returned_account2.statement()

returned_account2.withdraw(500)
account_registry.push_transaction("67890","Withdraw", 500)
print(account_registry.transactions)
returned_account2.statement()

account_registry.undo_last("67890")
print(account_registry.transactions)
returned_account2.statement()

account_registry.undo_last("67890")
print(account_registry.transactions)
returned_account2.statement()

returned_account2.withdraw(6100)
account_registry.push_transaction("67890","Withdraw", 6100)
print(account_registry.transactions)
returned_account2.statement()

account_registry.undo_last("67890")
print(account_registry.transactions)
returned_account2.statement()





abebe.subscribe(SMSAlertService())
# abebe.statement()
# abebe.deposite(100)
# abebe.statement()
# abebe.withdraw(500)
# abebe.statement()

kebede.subscribe(SMSAlertService())
# kebede.statement()
# kebede.deposite(170)
# kebede.statement()
# kebede.withdraw(890)
# kebede.statement()

# almaz = AccountFactory.create("Savings", "Almaz", "10293", 3560, 0.1)
# lemlem = AccountFactory.create("Current", "Lemlem", "68275", 4240, 0, 1500)


# almaz.subscribe(SMSAlertService())
# almaz.statement()
# almaz.deposite(100)
# almaz.statement()
# almaz.withdraw(500)
# almaz.statement()

# lemlem.subscribe(SMSAlertService())
# lemlem.statement()
# lemlem.deposite(100)
# lemlem.statement()
# lemlem.withdraw(500)
# lemlem.statement()
# lemlem.withdraw(5338)
# lemlem.statement()


