from collections import deque
import time


#1 Name the Big-O
print("\n***Big-O***\n")
#List index
print("\n***List Index***\n")
#It has O(1) time complexity since we do not have to search the entire list
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
print(numbers[3])

#Single loop
print("\n***Single Loop***\n")
#It has O(n) time complexity since have to loop over each item in the list, if there are n
#items, we have to loop n times
numbers1 = [1, 2, 3, 4, 5]
for index, number in enumerate(numbers1):
    numbers1[index] = number + 1
print(numbers1)
print()



#Nested loop
print("\n***Nested Loop***\n")
#It has O(n^2) time complexity since for each outer loop that loops length of the list times
# the inner loop also loops the same number of times.
numbers2 = [1, 2, 3, 4, 5, 6]
for i in range(len(numbers2)):
    for j in range(len(numbers2)):
        print(numbers2[i] * numbers2[j])

print()

#Dictionary lookup
print("\n***Dictionary Lookup***\n")
#It has O(1) time complexity because dictionaries use a hash function
#that maps the key to where the value is actually located like a list index
fruits = {"apple":1, "orange":2, "banana":3}
print(f"\"apple\":{fruits["apple"]}")

#Binary search
print("\n***Binary Search***\n")
#It has O(logn) time complexity because after each iteration the search range is halved
def binary_search(number_list, target):
    left = 0
    right = len(number_list) - 1
    middle = 0

    while(left <= right):
        middle = left + ((right - left) // 2)
        if number_list[middle] == target:
            print(f"Found {target} in list")
            break
        elif number_list[middle] < target:
            left = middle + 1
        elif number_list[middle] > target:
            right = middle - 1

binary_search(numbers, 2)


#2 List vs Dict lookup
print("\n***List vs Dictionary lookup***\n")
account_number_list = []
for i in range(1,100001):
    account_number_list.append(i)

account_number_dict = {}
for i in range(1, 100001):
    account_number_dict.setdefault(i, i)

target = 95766

start_time_dict = time.perf_counter()
if target in account_number_dict:
    print(f"{target} found in dict")
end_time_dict = time.perf_counter()

start_time_list = time.perf_counter()
if target in account_number_list:
    print(f"{target} found in list")
end_time_list = time.perf_counter()

execution_time_list = end_time_list - start_time_list
execution_time_dict = end_time_dict - start_time_dict

print(f"Searching list took {execution_time_list:.6f} seconds")
print(f"Searching dictionary took {execution_time_dict:.6f} seconds ")


#3 Build a stack
print("\n***Stack***\n")
class Stack:
    def __init__(self):
        self.max_size = 20
        self.__stack = []

    def isEmpty(self):
        if len(self.__stack) == 0:
            return True
        return False


    def push(self, item):
        if len(self.__stack) < self.max_size:
            self.__stack.append(item)
        else:
            print("Stack is full")

    def pop(self):
        if self.__stack:
            return self.__stack.pop()
        else:
            print("Stack is empty")
    
    def peek(self):
        if self.__stack:
            return self.__stack[-1]
        else:
            print("Stack is empty")


names = ["Abebe", "Kebede", "Almaz", "Lemlem", "Dawit", "Beletu", "Abeje"]
print("List of names")
print(names)
name_stack = Stack()

for name in names:
    name_stack.push(name)

print(f"Top element of stack:{name_stack.peek()}")

reversed_names = []

while not name_stack.isEmpty():
    reversed_names.append(name_stack.pop())
print("Names in reverse order")
print(reversed_names)


#4 Build a queue
print("\n***Queue***\n")
class BankQueue:
    def __init__(self):
        self.max_size = 20
        self.__queue = deque()

    def isEmpty(self):
        if len(self.__queue) == 0:
            return True
        return False

    def enqueue(self, item):
        if len(self.__queue) < self.max_size:
            self.__queue.append(item)
        else:
            print("Queue is full")

    def dequeue(self):
        if self.__queue:
            return self.__queue.popleft()
        else:
            print("Queue is empty")


bank_line = BankQueue()

bank_line.enqueue("Abebe")
bank_line.enqueue("Kebede")
bank_line.enqueue("Almaz")
bank_line.enqueue("Lemlem")
bank_line.enqueue("Beletu")

while not bank_line.isEmpty():
    print(f"{bank_line.dequeue()} has been served")


#5 Singly Linked List
print("\n***Singly Linked List***\n")
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    def push_front(self, node):
        new_node = node
        new_node.next = self.head
        self.head = new_node

    def print_all(self):
        pointer = self.head
        while True:
            if pointer == None:
                break
            print(pointer.data)
            pointer = pointer.next

abebe = Node("Abebe")
kebede = Node("Kebede")
almaz = Node("Almaz")
linked_list = LinkedList()
linked_list.push_front(abebe)
linked_list.push_front(kebede)
linked_list.push_front(almaz)
linked_list.print_all()