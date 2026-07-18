#SRP
import io
from abc import ABC, abstractmethod

print("\nSRP\n")
# class Report:
#     def __init__(self):
#         self.file_path = "Report.txt"
#         self.report_list = [["Abebe","2025",3.2],["Kebede","2025",3.5],["Almaz","2025",3.4],["Lemlem","2025",3.6]]

#     def build_report(self):
#         print("*****Student Report*****\n")
#         for list in self.report_list:
#             print(f"Name:{list[0]} Academic year:{list[1]} CGPA:{list[2]}\n")

#     def save_report(self):
#         try:
#             with open(self.file_path, "a") as report_file:
#                 for list in self.report_list:
#                     report_file.write(f"{list[0]} {list[1]} {list[2]}\n")
#         except io.UnsupportedOperation:
#             print("UnsupportedOperation: No write access")
#         else:
#             print("Data written successfully")

#     def email_report(self, recipient_address):
#         sender = "abebe@gmail.com"
#         print(f"\nFrom:{sender}")
#         print(f"To:{recipient_address}")
#         print("Subject: Student Report\n")

#         try:
#             with open(self.file_path, "r") as report_file:
#                 for line in report_file:
#                     print(line)
#         except FileNotFoundError:
#             print("FileNotFoundError: File does not exist")
#         else:
#             print("Email sent successfully")


report_list = [["Abebe","2025",3.2],["Kebede","2025",3.5],["Almaz","2025",3.4],["Lemlem","2025",3.6]]

class BuildReport:
    def build_report(self):
        print("*****Student Report*****\n")
        for list in report_list:
            print(f"Name:{list[0]} Academic year:{list[1]} CGPA:{list[2]}\n")


class SaveReport:
    def __init__(self):
        self.file_path = "Report.txt"

    def save_report(self):
        try:
            with open(self.file_path, "a") as report_file:
                for list in report_list:
                    report_file.write(f"{list[0]} {list[1]} {list[2]}\n")
        except io.UnsupportedOperation:
            print("UnsupportedOperation: No write access")
        else:
            print("Data saved successfully")


class EmailReport:
    def __init__(self, recipient_address):
        self.recipient_address = recipient_address
        self.file_path = "Report.txt"


    def email_report(self):
        sender = "abebe@gmail.com"
        print(f"\nFrom:{sender}")
        print(f"To:{self.recipient_address}")
        print("Subject: Student Report\n")

        try:
            with open(self.file_path, "r") as report_file:
                for line in report_file:
                    print(line)
        except FileNotFoundError:
            print("FileNotFoundError: File does not exist")
        else:
            print("Email sent successfully\n")



# student_report = Report()
# student_report.build_report()
# student_report.save_report()
# student_report.email_report("sew@gmail.com")

build = BuildReport()
build.build_report()
save = SaveReport()
save.save_report()
email = EmailReport("person@gmail.com")
email.email_report()

print("\nOCP\n")
#OCP
# def print_area(shape_type, length, width=0):
#     if shape_type == "Circle":
#         print(f"Area of circle:{3.14159265 * length * length}")
#     elif shape_type == "Square":
#         print(f"Area of square:{length * length}")
#     elif shape_type == "Triangle":
#         print(f"Area of triangle:{(length * width) / 2}")
#     else:
#         print(f"Area calculation for {shape_type} is not supported")

# print_area("Circle", 4)
# print_area("Square",5)
# print_area("Triangle",9,7)
# print_area("Rectangle",4, 17)

class Shape(ABC):
    @abstractmethod
    def calculate_area(self):
        pass

class Circle(Shape):
    PI = 3.14159265
    def __init__(self, radius):
        self.radius = radius

    def calculate_area(self):
        area = Circle.PI * self.radius * self.radius
        print(f"Area of Circle:{area}")

class Square(Shape):
    def __init__(self, side_length):
        self.side_length = side_length

    def calculate_area(self):
        area = self.side_length * self.side_length
        print(f"Area of Square:{area}")

class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def calculate_area(self):
        area = (self.base * self.height) / 2
        print(f"Area of Triangle:{area}")


circle = Circle(23)
circle.calculate_area()
square = Square(16)
square.calculate_area()
triangle = Triangle(34, 61)
triangle.calculate_area()


#Singleton
print("\nSingleton\n")
print()
class AppSettings:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.currency = "ETB"
        return cls._instance
    
app_settings1 = AppSettings()
print(app_settings1.currency)
app_settings2= AppSettings()

print(app_settings1 is app_settings2)

#Factory
print("\nFactory\n")
class ShapeFactory:
    @staticmethod
    def create(kind, length1, length2=0):
        if kind == "Circle":
            return Circle(length1)
        elif kind == "Square":
            return Square(length1)
        elif kind == "Triangle":
            return Triangle(length1, length2)
        raise ValueError(f"Unknown kind:{kind}")


fcircle = ShapeFactory.create("Circle", 42)
fcircle.calculate_area()

fsquare = ShapeFactory.create("Square", 11)
fsquare.calculate_area()

ftriangle = ShapeFactory.create("Triangle", 13, 5)
ftriangle.calculate_area()


#Observer
print("\nObserver\n")

class NewsAgency:
    def __init__(self):
        self._observers = []

    def broadcast_news(self, news):
        self._notify(news)

    def subscribe(self,observer):
        self._observers.append(observer)

    def _notify(self, event):
        for observer in self._observers:
            observer.update(event)

class RadioListener:
    def update(self,event):
        print(f"On the Radio:{event}")  

class TvViewer:
    def update(self, event):
        print(f"On Television:{event}")


ebc = NewsAgency()
abebe = RadioListener()
kebede = TvViewer()

ebc.subscribe(abebe)
ebc.subscribe(kebede)
ebc.subscribe(RadioListener())
ebc.subscribe(TvViewer())
ebc.broadcast_news("Breaking News")


    