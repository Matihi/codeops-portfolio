#Account Management System

from abc import ABC, abstractmethod

class BankConfig:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
        return cls._instance

bg1 = BankConfig()
bg2 = BankConfig()
print(bg1 is bg2)



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
    def __init__(self, owner, account_number, balance=0, rate=None):
        super().__init__(owner, account_number, balance)
        config = BankConfig()
        self.rate = rate if rate is not None else config.interest_rate

    def add_interest(self):
        self.deposite(self.balance * self.rate)

    def statement(self):
        print(f"Savings Account: {self.owner} with account number {self.account_number} and interest rate of {self.rate} has balance {self.balance} ETB\n")


class CurrentAccount(Account):
    def __init__(self, owner, account_number, balance=0, overdraft=None):
        super().__init__(owner, account_number, balance)
        config = BankConfig()
        self.overdraft_limit = overdraft if overdraft is not None else config.overdraft_limit


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

class AuditLogService(AlertService):
    def update(self, event):
        print(f"[Audit log] Log:{event}")


class AccountFactory:
    @staticmethod
    def create(kind, owner, account_number, balance=0, rate=None, overdraft=None):
        config = BankConfig()
        chosen_rate = rate if rate is not None else config.interest_rate
        chosen_overdraft_limit = overdraft if overdraft is not None else config.overdraft_limit
        if kind == "Savings":
            return SavingsAccount(owner, account_number, balance, chosen_rate)
        elif kind == "Current":
            return CurrentAccount(owner, account_number, balance, chosen_overdraft_limit)
        raise ValueError(f"{kind} type is unknown")
    



class AccountRegistry:
    def __init__(self):
        self.__by_number = {}
        self.__order = []
        self.__transactions = {}

    def add(self, account):
        if account.account_number not in self.__by_number:
            self.__by_number[account.account_number] = account
            self.__order.append(account.account_number)
        else:
            print(f"Account with account number {account.account_number} already exists")

    def find(self, account_number):
        return self.__by_number.get(account_number)

    def list_all(self):
        accounts = []
        for account_number in self.__order:
            if account_number in self.__by_number:
                accounts.append(self.__by_number[account_number])
        return accounts

    def push_transaction(self, account_number, transaction_type, amount):
        account = self.find(account_number)
        if account != None:
            if transaction_type == "Deposit" or transaction_type == "Withdraw":
                if amount > 0:
                    if self.__transactions.get(account_number) == None:
                        self.__transactions[account_number] = []

                    if transaction_type == "Deposit":
                        self.__transactions[account_number].append(amount)
                    elif transaction_type == "Withdraw":
                        self.__transactions[account_number].append(-amount)
                else:
                    print("Amount must be positive")
            else:
                print(f"Transaction type {transaction_type} is unknown")
        else:
            print(f"Account with account number {account_number} does not exist")

    
    def undo_last(self, account_number):
        account = self.find(account_number)
        if account != None:
            transaction_list = self.__transactions.get(account_number)
            if transaction_list:
                latest_transaction = transaction_list.pop()
                if latest_transaction > 0:
                    account.withdraw(latest_transaction)
                    print("Deposit has been undone")
                elif latest_transaction < 0:
                    account.deposite(-latest_transaction)
                    print("Withdraw has been undone")
            else:
                print("Stack is empty")
        else:
            print(f"Account with account number {account_number} does not exist")

    def top_by_balance(self, cutoff=5):
        sorted_accounts = sorted(self.__by_number.values(), key= lambda a:a.balance, reverse=True)
        return sorted_accounts[:cutoff]

    def find_by_number(self, account_number):
        def binary_search(numbers, target):
            left = 0
            right = len(numbers) - 1
            middle = 0

            while(left <= right):
                middle = left + ((right - left) // 2)

                if numbers[middle] == target:
                    return middle
                elif numbers[middle] < target:
                    left = middle + 1
                else:
                    right = middle - 1
            return -1

        sorted_account_numbers = sorted(self.__by_number)
        found_index = binary_search(sorted_account_numbers,account_number)
        return self.__by_number[sorted_account_numbers[found_index]] if found_index >= 0 else None

    def total_transactions(self, account_number):
        if account_number in self.__by_number:
            if account_number in self.__transactions:
                transaction_list = self.__transactions.get(account_number)
                def add_transactions(transaction_history):
                    if not transaction_history:
                        return 0
                    return transaction_history[0] + add_transactions(transaction_history[1:])

                total = add_transactions(transaction_list)
                print(f"Account with account number {account_number} has a net transaction of {total} ETB\n")

            else:
                print(f"Account with account number {account_number} has not made any transactions yet")
        else:
            print(f"Account with account number {account_number} does not exist")









        
abebe = AccountFactory.create("Savings", "Abebe", "12345", 2530)
kebede = AccountFactory.create("Current", "Kebede", "67890", 3400)
almaz = AccountFactory.create("Savings", "Almaz", "13579", 3500, 0.1)
lemlem = AccountFactory.create("Current", "Lemlem", "68024", 2470, 0, 1500)


account_registry = AccountRegistry()
account_registry.add(abebe)
account_registry.add(kebede)
account_registry.add(almaz)
account_registry.add(lemlem)

accounts = account_registry.list_all()
for account in accounts:
    print(account.owner)




abebe_account = account_registry.find("12345") if account_registry.find("12345") != None else ValueError("Account does not exist")
abebe_account.statement()
abebe_account.subscribe(SMSAlertService())
abebe_account.subscribe(AuditLogService())

abebe_account.deposite(250)
account_registry.push_transaction("12345", "Deposit", 250)
abebe_account.statement()

abebe_account.deposite(100)
account_registry.push_transaction("12345", "Deposit", 100)
abebe_account.statement()

abebe_account.deposite(1400)
account_registry.push_transaction("12345","Deposit", 1400)
abebe_account.statement()

abebe_account.withdraw(350)
account_registry.push_transaction("12345","Withdraw", 350)
abebe_account.statement()

abebe_account.withdraw(500)
account_registry.push_transaction("12345","Withdraw", 500)
abebe_account.statement()
account_registry.total_transactions("12345")

account_registry.undo_last("12345")
abebe_account.statement()
account_registry.total_transactions("12345")

account_registry.undo_last("12345")
abebe_account.statement()
account_registry.total_transactions("12345")




kebede_account = account_registry.find("67890") if account_registry.find("67890") != None else ValueError("Account does not exist")
kebede_account.statement()
kebede_account.subscribe(SMSAlertService())
kebede_account.subscribe(AuditLogService())

kebede_account.deposite(250)
account_registry.push_transaction("67890", "Deposit", 250)
kebede_account.statement()

kebede_account.deposite(100)
account_registry.push_transaction("67890", "Deposit", 100)
kebede_account.statement()

kebede_account.deposite(1400)
account_registry.push_transaction("67890","Deposit", 1400)
kebede_account.statement()

kebede_account.withdraw(350)
account_registry.push_transaction("67890","Withdraw", 350)
kebede_account.statement()

kebede_account.withdraw(500)
account_registry.push_transaction("67890","Withdraw", 500)
kebede_account.statement()
account_registry.total_transactions("67890")

account_registry.undo_last("67890")
kebede_account.statement()
account_registry.total_transactions("67890")

account_registry.undo_last("67890")
kebede_account.statement()
account_registry.total_transactions("67890")

kebede_account.withdraw(6100)
account_registry.push_transaction("67890","Withdraw", 6100)
kebede_account.statement()
account_registry.total_transactions("67890")

account_registry.undo_last("67890")
kebede_account.statement()
account_registry.total_transactions("67890")


almaz_account = account_registry.find("13579") if account_registry.find("13579") != None else ValueError("Account does not exist")
almaz_account.statement()
almaz_account.subscribe(SMSAlertService())
almaz_account.subscribe(AuditLogService())

almaz_account.deposite(250)
account_registry.push_transaction("13579", "Deposit", 250)
almaz_account.statement()

almaz_account.deposite(100)
account_registry.push_transaction("13579", "Deposit", 100)
almaz_account.statement()

almaz_account.deposite(1230)
account_registry.push_transaction("13579","Deposit", 1230)
almaz_account.statement()

almaz_account.withdraw(350)
account_registry.push_transaction("13579","Withdraw", 350)
almaz_account.statement()

almaz_account.withdraw(500)
account_registry.push_transaction("13579","Withdraw", 500)
almaz_account.statement()
account_registry.total_transactions("13579")

account_registry.undo_last("13579")
almaz_account.statement()
account_registry.total_transactions("13579")

account_registry.undo_last("13579")
almaz_account.statement()
account_registry.total_transactions("13579")


lemlem_account = account_registry.find("68024") if account_registry.find("68024") != None else ValueError("Account does not exist")
lemlem_account.statement()
lemlem_account.subscribe(SMSAlertService())
lemlem_account.subscribe(AuditLogService())

lemlem_account.deposite(250)
account_registry.push_transaction("68024", "Deposit", 250)
lemlem_account.statement()

lemlem_account.deposite(100)
account_registry.push_transaction("68024", "Deposit", 100)
lemlem_account.statement()

lemlem_account.deposite(1400)
account_registry.push_transaction("68024","Deposit", 1400)
lemlem_account.statement()

lemlem_account.withdraw(350)
account_registry.push_transaction("68024","Withdraw", 350)
lemlem_account.statement()

lemlem_account.withdraw(500)
account_registry.push_transaction("68024","Withdraw", 500)
lemlem_account.statement()
account_registry.total_transactions("68024")

account_registry.undo_last("68024")
lemlem_account.statement()
account_registry.total_transactions("68024")

account_registry.undo_last("68024")
lemlem_account.statement()
account_registry.total_transactions("68024")

lemlem_account.withdraw(5720)
account_registry.push_transaction("68024","Withdraw", 5720)
lemlem_account.statement()
account_registry.total_transactions("68024")

account_registry.undo_last("68024")
lemlem_account.statement()
account_registry.total_transactions("68024")

list_of_accounts = account_registry.top_by_balance(3)

for account in list_of_accounts:
    print(f"{account.owner}: {account.balance}")

account_number1 = "68024"
account_number2 = "17745"
possible_account = account_registry.find_by_number(account_number1)
print(f"Account with account number {possible_account.account_number} exists in the registry") if possible_account != None else print(f"Account with account number {account_number2} does not exist in the registry")

possible_account = account_registry.find_by_number(account_number2)
print(f"Account with account number {possible_account.account_number} exists in the registry") if possible_account != None else print(f"Account with account number {account_number2} does not exist in the registry")

account_registry.total_transactions("68024")
account_registry.total_transactions("13579")










