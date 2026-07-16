#Vehicle Hierarchy

from abc import ABC, abstractmethod

class Vehicle(ABC):
    def __init__(self, make, model):
        self.make = make
        self.model = model

    def describe(self):
        print(f"Make:{self.make} Model:{self.model}")

    @abstractmethod
    def wheels(self): ...



class Car(Vehicle):
    def __init__(self, make, model):
        super().__init__(make, model)

    def wheels(self):
        return 4


class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity = capacity

    def describe(self):
        print(f"Make:{self.make} Model:{self.model} Capacity:{self.capacity}")

    def wheels(self):
        return 10


# vehicle1 = Vehicle("Honda", "Civic") #can't instantiate abstract class
corolla = Car("Toyota", "Corolla")
accord = Car("Honda", "Accord")
sino_truck = Truck("HOWO", "ZZ3257N4147W", 30000)

vehicles = [corolla, accord, sino_truck]

for vehicle in vehicles:
    vehicle.describe()

print(corolla.wheels())
print(sino_truck.wheels())
