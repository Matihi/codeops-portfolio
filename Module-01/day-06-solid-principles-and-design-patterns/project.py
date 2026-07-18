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

# bg1 = BankConfig()
# bg2 = BankConfig()
# print(bg1 is bg2)



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
        
abebe = AccountFactory.create("Savings", "Abebe", "12345", 3520)
kebede = AccountFactory.create("Current", "Kebede", "67890", 2470, 0)

abebe.statement()
abebe.add_interest()
abebe.statement()
kebede.statement()

almaz = AccountFactory.create("Savings", "Almaz", "10293", 3560, 0.1)
lemlem = AccountFactory.create("Current", "Lemlem", "68275", 4240, 0, 1500)

sms = SMSAlertService()
log = AuditLogService()

almaz.subscribe(sms)
almaz.subscribe(log)
almaz.statement()
almaz.deposite(100)
almaz.statement()
almaz.withdraw(500)
almaz.statement()
almaz.add_interest()
almaz.statement()

lemlem.subscribe(sms)
lemlem.subscribe(log)
lemlem.statement()
lemlem.deposite(100)
lemlem.statement()
lemlem.withdraw(500)
lemlem.statement()
lemlem.withdraw(4838)
lemlem.statement()


