
from collections import deque
import heapq

#1 BST
print("\nBST\n")

class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def insert(root, value):
    if root is None:
        return Node(value)

    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)
    return root

def inorder(root):
    if root is not None:
        inorder(root.left)
        print(root.value)
        inorder(root.right)

balances = [100, 50, 60, 150, 80, 200, 140, 30]

root = None
for balance in balances:
    root = insert(root, balance)

print("Output of inorder traversal of the BST:")
inorder(root)

#2 Tree Depth
print("\nTree Depth\n")

def height(node):
    if node is None:
        return 0

    left_height = height(node.left)
    right_height = height(node.right)

    return max(left_height, right_height) + 1

print(f"Height of the tree: {height(root)}")

#3 Graph BFS
print("\nBFS\n")

graph = {
    "A": ["B", "C"],
    "B": ["A", "D", "E"],
    "C": ["A", "F"],
    "D": ["B"],
    "E": ["B", "F"],
    "F": ["C", "E"],
    "G": []
}

def bfs(graph, start):
    visited = set()
    order = []
    queue = deque([start])

    while queue:
        vertex = queue.popleft()

        if vertex not in visited:
            visited.add(vertex)
            order.append(vertex)

            for neighbor in graph[vertex]:
                if neighbor not in visited:
                    queue.append(neighbor)

    return order

print(f"BFS order:{bfs(graph, "A")}")

#4 Graph DFS
print("\nDFS\n")

def dfs(graph, start):
    visited = set()
    order = []

    def traverse(vertex):
        visited.add(vertex)
        order.append(vertex)

        for neighbor in graph[vertex]:
            if neighbor not in visited:
                traverse(neighbor)

    traverse(start)
    return order


print(f"DFS order:{dfs(graph, "A")}")

#5 Priority Queue
print("\nPriority Queue\n")

priority_queue = []

heapq.heappush(priority_queue, (3, "Eat lunch"))
heapq.heappush(priority_queue, (1, "Finish assignment"))
heapq.heappush(priority_queue, (5, "Do something else"))
heapq.heappush(priority_queue, (2, "Study for exam"))
heapq.heappush(priority_queue, (4, "Message friend"))

print("Tasks in priority order:")

while priority_queue:
    priority, task = heapq.heappop(priority_queue)
    print(f"Priority: {priority}, Task: {task}")