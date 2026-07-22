#1 Recursive Sum
print("\nRecursive Sum\n")

numbers = [1, 2, 13, 4, 6, 7, 10, 8]

def total(nums):
    if not nums:
        return 0
    sum = nums[0] + total(nums[1:])
    return sum

print(f"Sum of elements of the list {numbers} = {total(numbers)}")
print()

def count_down(n):
    if n < 1:
        return
    print(n)
    count_down(n - 1)

count_down(21)

#2 Binary search
print("\nBinary Search\n")
items = [1, 3, 23, 45, 46, 52, 60, 77, 89]

def binary_search(number_list, target):
    left = 0
    right = len(number_list) - 1
    middle = 0

    while(left <= right):
        middle = left + ((right - left) // 2)
        if number_list[middle] == target:
            return middle
        elif number_list[middle] < target:
            left = middle + 1
        elif number_list[middle] > target:
            right = middle - 1
    return -1

print(f"Index returned from binary search = {binary_search(items, 1)}")


#3 Merge Sort
print("\nMerge Sort\n")

unsorted_items = [123, 21, 2, 1, 67, 4, 34, 120, 100, 4, 38]

def merge_sort(items):
    if len(items) <= 1:
        return items
    
    middle = len(items) // 2
    left = items[:middle]
    right = items[middle:]

    left_item = merge_sort(left)
    right_item = merge_sort(right)

    return merge(left_item, right_item)

def merge(left, right):
    i = j = 0
    sorted_items = []

    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            sorted_items.append(left[i])
            i += 1
        else:
            sorted_items.append(right[j])
            j += 1

    sorted_items.extend(left[i:])
    sorted_items.extend(right[j:])

    return sorted_items

print(f"After calling merge sort:{merge_sort(unsorted_items)}")

sorted_items = sorted(unsorted_items)
print(f"After calling sorted(): {sorted_items}")

#4 Sort with a key
print("\nSort with a key\n")

list_of_tuples = [("Abebe", 2350), ("Kebede", 1438), ("Almaz", 1678), ("Lemlem", 1260)]
sorted_list_of_tuples = sorted(list_of_tuples, key=lambda a:a[1], reverse=True)
print(f"Sorted list of tuples by balance in descending order :{sorted_list_of_tuples}")


#5 Two Pointers
print("\nTwo Pointers\n")
sorted_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

def has_pair(nums, target):
    left = 0
    right = len(nums) - 1

    while(left < right):
        if nums[left] + nums[right] == target:
            return f"{nums[left]} + {nums[right]} = {target}"
        elif nums[left] + nums[right] < target:
            left += 1
        else:
            right -= 1
    return f"No pair was found that adds up to {target}"
    

print(has_pair(sorted_list, 0))
        




    
