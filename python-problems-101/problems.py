import math
# to pass the test function, please return a string of 'string' from then function
# eg: test() => 'string'


def test():
    return 'string'

# write a function that returns "Hello World!" if no argument is given, or "Hello <argument>!" otherwise
# eg: hello() => "Hello World!"; hello("Mike") => "Hello Mike!"

# success


def hello(string="World"):
    return f"Hello {string}!"


print(hello('clem'))
print(hello())

# write a function that will calculate the area of a circle, given the radius


def area_of_circle(radius):
    return radius * radius * math.pi


print(area_of_circle(4))

# print(area_of_circle(2))


# write a function to convert celcius to farenheit
def celcius_to_farenheit(celcius):
    return (celcius * 9/5) + 32


print(celcius_to_farenheit(15))

# write a function that will reverse a number (eg. 456733 become 337654)


def number_reverse(number):
    reversed = str(number)[::-1]
    return float(reversed)


print(number_reverse(123))
# write a function to check if a word or phrase is a palindrome returning a boolean
# eg. palindrome_check('dad') => True, palindrome('nonsense') => False

# Find reverse of string
# Check if reverse and original are same or not.


def palindrome_check(string):
    string = string.replace(" ", "").lower()
    return string == string[::-1]

    # This works but is memory intensive as creating a new string object on everyrecursive call
    # string = "".join(string.split()).lower()
    # if (len(string) <= 1):
    #     return True
    # if string[0] != string[-1]:
    #     return False
    # return palindrome_check(string[1:-1])

    # This worked to reverse the string but doesn't return a boolean
    # new_strings = []
    # index = len(string)
    # while index:
    #     index -= 1
    #     new_strings.append(string[index])
    #     ''.join(new_strings)


print(palindrome_check('clem is great'))

# write a function that returns the letters of a word or phrase in alphabetical order case insensitive
# eg. order_string_alphabetically('javascript is cool') => 'aacciijlooprsstv'


def order_string_alphabetically(string):
    string_value = string.replace(' ', '').lower()
    sorted_string = sorted(string_value)
    return ''.join(sorted_string)


print(order_string_alphabetically('Clem Is Great'))

# write a function that capitalizes the first letter of each word
# eg. title_case('the lord of the rings') => 'The Lord Of The Rings'


def title_case(string):
    return " ".join(word.capitalize() for word in string.split())


print(title_case("they're my new blue socks"))

# write a function that returns the number of vowels in a string case insensitive
# 'y' should not be considered a vowel
# eg: num_of_vowels('Yellow Submarine') => 6


def num_of_vowels(string):
    num_vowels = 0
    for char in string:
        if char in "aeiouAEIOU":
            num_vowels = num_vowels+1
    return num_vowels


print(num_of_vowels('this is test: aeiouAEIOU'))

# write a function that frames a string in asterisks (*)
#                             ***************
# eg: frame('Hello Kitty') => * Hello Kitty *
#                             ***************


def frame(string):
    asterisk = '*'
    number_of_repeats = len(string) + 4
    border = ''.join([char * number_of_repeats for char in asterisk])
    return border + '\n* ' + string + ' *\n' + border


print(frame('My name, Clem, written among stars'))
