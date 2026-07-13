import io


#Reading file

def write_to_dictionary(file_path):
    customers = {}
    try:
        with open(file_path, "r") as transaction_file:
            for line in transaction_file:
                customer_name, total = line.strip().split(",")

                if customer_name in customers:
                    customers[customer_name] += float(total)
                else:
                    customers[customer_name] = float(total)

    except FileNotFoundError:
        print("FileNotFoundError: the file does not exist")
    else:
        print("File read successfully")
    finally:
        print("Operation Done")
    return customers


def sort_dictionary(unsorted_dictionary):
    sorted_dictionary = dict(sorted(unsorted_dictionary.items(), key=lambda item: item[1], reverse=True))
    return sorted_dictionary

def generate_report(customer_data):
    try:
        with open("report.txt", "w") as report_file:
            report_file.write(f"*****Customer Report*****\n\n")
            report_file.write(f"No  Name    Total amount per person\n")
            number_of_customers = len(customer_data)
            total_amount = 0
            count = 1
            for customer, amount in customer_data.items():    
                report_file.write(f"{count}  {customer}    {amount}\n")
                total_amount += amount
                count += 1
            
            report_file.write(f"\nNumber of customers : {number_of_customers}")
            report_file.write(f"\nTotal transaction: {total_amount}")

    except io.UnsupportedOperation:
        print("io.UnsupportedOperation: No write access")
    else:
        print("Write operation successful")
    finally:
        print("Operation Done")


customer_dict = write_to_dictionary("transactions.txt")
sorted_customer_dict = sort_dictionary(customer_dict)
generate_report(sorted_customer_dict)

