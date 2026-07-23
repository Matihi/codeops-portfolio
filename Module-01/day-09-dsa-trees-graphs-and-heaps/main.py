#Account Management System

from abc import ABC, abstractmethod
from collections import deque

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

    def deposit(self, amount):
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
        self.deposit(self.balance * self.rate)

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
                    account.deposit(-latest_transaction)
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



class Branch:
    def __init__(self, name):
        self.name = name
        self.children = []
        self.accounts = []
        self.__transfers = {}

    def add_branch(self, branch):
        if type(branch) is Branch:
            self.children.append(branch)
        else:
            print(f"{branch} is not a branch")

    def add_account(self, registry, account_number):
        account = registry.find(account_number)
        if isinstance(account, Account):
            self.accounts.append(account)
        else:
            print(f"{account} is not an account")

    def total_balance(self):
        total = sum(a.balance for a in self.accounts)
        for child in self.children:
            total += child.total_balance()
        return total

    def transfer_to(self, registry, sender_account_number, recipient_account_number, amount):
        if sender_account_number != recipient_account_number:
            sender = registry.find(sender_account_number)
            recipient = registry.find(recipient_account_number)
            if sender != None and recipient != None:
                if amount > 0:
                    sender.withdraw(amount)
                    recipient.deposit(amount)
                    if self.__transfers.get(sender_account_number) == None:
                        self.__transfers[sender_account_number] = []
                    self.__transfers[sender_account_number].append(recipient_account_number)
                    print(f"Account with account number {sender_account_number} has transfered {amount} ETB to account with account number {recipient_account_number}")
                else:
                    print("Amount must be positive")
            else:
                print(f"{sender_account_number} or {recipient_account_number} account number does not exist")
        else:
            print("Sender and Recipient account numbers are the same!")

    def has_sent_to(self, sender_account_number):
        transfer_list = self.__transfers.get(sender_account_number)
        if transfer_list != None:
            def bfs(transfers, start):
                visited = set()
                order = []
                queue = deque([start])
                while queue:
                    vertex = queue.popleft()
                    if vertex not in visited:
                        visited.add(vertex)
                        order.append(vertex)
                        for neighbor in transfers:
                            if neighbor not in visited:
                                queue.append(neighbor)
                return order[1:]

            return bfs(transfer_list, sender_account_number)
        else:
            print(f"Account with account number {sender_account_number} has not transfered to anyone in this branch")






account_registry = AccountRegistry()
account_registry.add(AccountFactory.create("Savings", "Abebe", "12345", 2530))
account_registry.add(AccountFactory.create("Current", "Kebede", "67890", 3400))
account_registry.add(AccountFactory.create("Savings", "Almaz", "13579", 3500, 0.1))
account_registry.add(AccountFactory.create("Current", "Lemlem", "68024", 2470, 0, 1500))
account_registry.add(AccountFactory.create("Savings", "Abeje", "23456", 2400))
account_registry.add(AccountFactory.create("Current", "Beletu", "34567", 3200))
account_registry.add(AccountFactory.create("Savings", "Dawit", "45678", 4100))
account_registry.add(AccountFactory.create("Current", "Tsedey", "56788", 3100))
account_registry.add(AccountFactory.create("Savings", "Henok", "98765", 4400))





bole = Branch("Bole")
bole.add_account(account_registry,"12345")

kaliti = Branch("Kaliti")
kaliti.add_account(account_registry, "67890")

arada = Branch("Arada")
arada.add_account(account_registry, "13579")

abadir = Branch("Abadir")
abadir.add_account(account_registry, "68024")

gurgura = Branch("Gurgura")
gurgura.add_account(account_registry, "23456")

addis_ababa = Branch("Addis Ababa")
addis_ababa.add_account(account_registry, "34567")
addis_ababa.add_branch(bole)
addis_ababa.add_branch(kaliti)
addis_ababa.add_branch(arada)

harar = Branch("Harar")
harar.add_account(account_registry, "45678")
harar.add_branch(abadir)

diredawa = Branch("Diredawa")
diredawa.add_account(account_registry, "56788")
diredawa.add_branch(gurgura)

head_office = Branch("Head Office")
head_office.add_account(account_registry, "98765")
head_office.add_branch(addis_ababa)
head_office.add_branch(harar)
head_office.add_branch(diredawa)

print(f"Total balance in {head_office.name} branch is {head_office.total_balance()} ETB")
print(f"Total balance in {kaliti.name} branch is {kaliti.total_balance()} ETB")
print(f"Total balance in {harar.name} branch is {harar.total_balance()} ETB")
print(f"Total balance in {bole.name} branch is {bole.total_balance()} ETB")

account_number = "12345"

bole.transfer_to(account_registry, account_number, "67890", 500)
bole.transfer_to(account_registry, account_number, "13579", 500)
bole.transfer_to(account_registry, account_number, "34567", 500)
bole.transfer_to(account_registry, account_number, "34567", 500)
bole.transfer_to(account_registry, account_number, "56788", 500)
print(f"Total balance in {bole.name} branch is {bole.total_balance()} ETB")
print(f"Total balance in {kaliti.name} branch is {kaliti.total_balance()} ETB")
print(f"Total balance in {head_office.name} branch is {head_office.total_balance()} ETB")

print(f"Account with account number {account_number} has sent to these accounts {bole.has_sent_to(account_number)} in Bole branch")

second_account_number = "23456"

gurgura.transfer_to(account_registry, second_account_number, "12345", 130)
gurgura.transfer_to(account_registry, second_account_number, "23456", 130)
gurgura.transfer_to(account_registry, second_account_number, "98765", 130)

print(f"Account with account number {second_account_number} has sent to these accounts {gurgura.has_sent_to(second_account_number)} in Gurgura branch")

