export type Category = "arrays" | "strings" | "math" | "hashmap" | "dp";
export type Difficulty = "easy" | "medium" | "hard";

export interface Problem {
  id: string;
  title: string;
  category: Category;
  difficulty: Difficulty;
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  testCases: { input: string; expected: string }[];
  starterCode: string;
}

export const PROBLEMS: Problem[] = [
  // ===== EASY =====
  {
    id: "two-sum",
    title: "Two Sum",
    category: "arrays",
    difficulty: "easy",
    description:
      "Given a list of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`.\n\nYou may assume that each input has exactly one solution, and you may not use the same element twice.\n\nPrint the two indices separated by a space, in ascending order.",
    examples: [
      {
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "0 1",
        explanation: "nums[0] + nums[1] = 2 + 7 = 9",
      },
      { input: "nums = [3, 2, 4], target = 6", output: "1 2" },
    ],
    testCases: [
      { input: "[2, 7, 11, 15]\n9", expected: "0 1" },
      { input: "[3, 2, 4]\n6", expected: "1 2" },
      { input: "[1, 5, 3, 7]\n8", expected: "1 2" },
    ],
    starterCode: `def two_sum(nums, target):
    # Your code here
    pass

# Read input
nums = eval(input())
target = int(input())
result = sorted(two_sum(nums, target))
print(result[0], result[1])
`,
  },
  {
    id: "reverse-string",
    title: "Reverse String",
    category: "strings",
    difficulty: "easy",
    description:
      "Given a string `s`, return the string reversed.\n\nPrint the reversed string.",
    examples: [
      { input: 's = "hello"', output: "olleh" },
      { input: 's = "coding cats"', output: "stac gnidoc" },
    ],
    testCases: [
      { input: "hello", expected: "olleh" },
      { input: "coding cats", expected: "stac gnidoc" },
      { input: "a", expected: "a" },
    ],
    starterCode: `def reverse_string(s):
    # Your code here
    pass

s = input()
print(reverse_string(s))
`,
  },
  {
    id: "fizzbuzz",
    title: "FizzBuzz",
    category: "math",
    difficulty: "easy",
    description:
      'Given an integer `n`, print each number from 1 to `n` on a new line, but:\n- For multiples of 3, print `"Fizz"` instead\n- For multiples of 5, print `"Buzz"` instead\n- For multiples of both 3 and 5, print `"FizzBuzz"` instead',
    examples: [{ input: "n = 5", output: "1\n2\nFizz\n4\nBuzz" }],
    testCases: [
      { input: "5", expected: "1\n2\nFizz\n4\nBuzz" },
      {
        input: "15",
        expected:
          "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz",
      },
    ],
    starterCode: `def fizzbuzz(n):
    # Your code here
    pass

n = int(input())
fizzbuzz(n)
`,
  },
  {
    id: "character-count",
    title: "Character Frequency",
    category: "hashmap",
    difficulty: "easy",
    description:
      'Given a string `s`, print each unique character and its count, one per line, in the order they first appear.\n\nFormat each line as `char:count`.',
    examples: [{ input: 's = "hello"', output: "h:1\ne:1\nl:2\no:1" }],
    testCases: [
      { input: "hello", expected: "h:1\ne:1\nl:2\no:1" },
      { input: "aab", expected: "a:2\nb:1" },
      { input: "abcabc", expected: "a:2\nb:2\nc:2" },
    ],
    starterCode: `def char_frequency(s):
    # Your code here
    pass

s = input()
char_frequency(s)
`,
  },
  {
    id: "palindrome-check",
    title: "Palindrome Check",
    category: "strings",
    difficulty: "easy",
    description:
      'Given a string `s`, print `"True"` if it reads the same forwards and backwards (ignoring case), otherwise print `"False"`.',
    examples: [
      { input: 's = "racecar"', output: "True" },
      { input: 's = "hello"', output: "False" },
    ],
    testCases: [
      { input: "racecar", expected: "True" },
      { input: "hello", expected: "False" },
      { input: "Madam", expected: "True" },
    ],
    starterCode: `def is_palindrome(s):
    # Your code here
    pass

s = input()
print(is_palindrome(s))
`,
  },

  {
    id: "sum-of-list",
    title: "Sum of List",
    category: "arrays",
    difficulty: "easy",
    description:
      "Given a list of integers `nums`, print the sum of all the numbers.",
    examples: [
      { input: "nums = [1, 2, 3, 4, 5]", output: "15" },
      { input: "nums = [10, -5, 3]", output: "8" },
    ],
    testCases: [
      { input: "[1, 2, 3, 4, 5]", expected: "15" },
      { input: "[10, -5, 3]", expected: "8" },
      { input: "[0]", expected: "0" },
      { input: "[-1, -2, -3]", expected: "-6" },
    ],
    starterCode: `def sum_of_list(nums):
    # Your code here
    pass

nums = eval(input())
print(sum_of_list(nums))
`,
  },
  {
    id: "find-maximum",
    title: "Find Maximum",
    category: "arrays",
    difficulty: "easy",
    description:
      "Given a list of integers `nums`, print the largest number in the list.",
    examples: [
      { input: "nums = [1, 5, 3, 2]", output: "5" },
      { input: "nums = [-1, -5, -2]", output: "-1" },
    ],
    testCases: [
      { input: "[1, 5, 3, 2]", expected: "5" },
      { input: "[-1, -5, -2]", expected: "-1" },
      { input: "[42]", expected: "42" },
      { input: "[0, 100, 50]", expected: "100" },
    ],
    starterCode: `def find_maximum(nums):
    # Your code here
    pass

nums = eval(input())
print(find_maximum(nums))
`,
  },
  {
    id: "count-vowels",
    title: "Count Vowels",
    category: "strings",
    difficulty: "easy",
    description:
      "Given a string `s`, print the number of vowels (`a`, `e`, `i`, `o`, `u`) in the string. Ignore case.",
    examples: [
      { input: 's = "hello"', output: "2", explanation: "e and o are vowels" },
      { input: 's = "aeiou"', output: "5" },
    ],
    testCases: [
      { input: "hello", expected: "2" },
      { input: "aeiou", expected: "5" },
      { input: "xyz", expected: "0" },
      { input: "Coding Cats", expected: "3" },
    ],
    starterCode: `def count_vowels(s):
    # Your code here
    pass

s = input()
print(count_vowels(s))
`,
  },
  {
    id: "even-or-odd",
    title: "Even or Odd",
    category: "math",
    difficulty: "easy",
    description:
      'Given an integer `n`, print `"Even"` if the number is even, or `"Odd"` if it is odd.',
    examples: [
      { input: "n = 4", output: "Even" },
      { input: "n = 7", output: "Odd" },
    ],
    testCases: [
      { input: "4", expected: "Even" },
      { input: "7", expected: "Odd" },
      { input: "0", expected: "Even" },
      { input: "-3", expected: "Odd" },
    ],
    starterCode: `def even_or_odd(n):
    # Your code here
    pass

n = int(input())
print(even_or_odd(n))
`,
  },
  {
    id: "sum-of-digits",
    title: "Sum of Digits",
    category: "math",
    difficulty: "easy",
    description:
      "Given a non-negative integer `n`, print the sum of all its digits.",
    examples: [
      { input: "n = 123", output: "6", explanation: "1 + 2 + 3 = 6" },
      { input: "n = 99", output: "18" },
    ],
    testCases: [
      { input: "123", expected: "6" },
      { input: "99", expected: "18" },
      { input: "0", expected: "0" },
      { input: "1000", expected: "1" },
    ],
    starterCode: `def sum_of_digits(n):
    # Your code here
    pass

n = int(input())
print(sum_of_digits(n))
`,
  },
  {
    id: "count-words",
    title: "Count Words",
    category: "strings",
    difficulty: "easy",
    description:
      "Given a sentence `s`, print the number of words in it. Words are separated by spaces.",
    examples: [
      { input: 's = "hello world"', output: "2" },
      { input: 's = "the quick brown fox"', output: "4" },
    ],
    testCases: [
      { input: "hello world", expected: "2" },
      { input: "the quick brown fox", expected: "4" },
      { input: "one", expected: "1" },
      { input: "coding cats is fun", expected: "4" },
    ],
    starterCode: `def count_words(s):
    # Your code here
    pass

s = input()
print(count_words(s))
`,
  },
  {
    id: "contains-duplicate",
    title: "Contains Duplicate",
    category: "hashmap",
    difficulty: "easy",
    description:
      'Given a list of integers `nums`, print `"True"` if any value appears more than once, otherwise print `"False"`.',
    examples: [
      {
        input: "nums = [1, 2, 3, 1]",
        output: "True",
        explanation: "1 appears twice",
      },
      { input: "nums = [1, 2, 3, 4]", output: "False" },
    ],
    testCases: [
      { input: "[1, 2, 3, 1]", expected: "True" },
      { input: "[1, 2, 3, 4]", expected: "False" },
      { input: "[1]", expected: "False" },
      { input: "[5, 5, 5]", expected: "True" },
    ],
    starterCode: `def contains_duplicate(nums):
    # Your code here
    pass

nums = eval(input())
print(contains_duplicate(nums))
`,
  },
  {
    id: "square-number",
    title: "Square Number",
    category: "math",
    difficulty: "easy",
    description: "Given an integer `n`, print its square (n × n).",
    examples: [
      { input: "n = 5", output: "25" },
      { input: "n = 3", output: "9" },
    ],
    testCases: [
      { input: "5", expected: "25" },
      { input: "3", expected: "9" },
      { input: "0", expected: "0" },
      { input: "10", expected: "100" },
    ],
    starterCode: `def square_number(n):
    # Your code here
    pass

n = int(input())
print(square_number(n))
`,
  },

  {
    id: "print-hello",
    title: "Print Hello World",
    category: "strings",
    difficulty: "easy",
    description: "Print `Hello, World!` exactly.",
    examples: [{ input: "(none)", output: "Hello, World!" }],
    testCases: [{ input: "", expected: "Hello, World!" }],
    starterCode: `# Your code here\n`,
  },
  {
    id: "add-two-numbers",
    title: "Add Two Numbers",
    category: "math",
    difficulty: "easy",
    description: "Given two integers `a` and `b`, print their sum.",
    examples: [{ input: "a = 3, b = 4", output: "7" }],
    testCases: [
      { input: "3\n4", expected: "7" },
      { input: "0\n0", expected: "0" },
      { input: "-5\n10", expected: "5" },
    ],
    starterCode: `a = int(input())\nb = int(input())\n# Your code here\n`,
  },
  {
    id: "multiply-two",
    title: "Multiply Two Numbers",
    category: "math",
    difficulty: "easy",
    description: "Given two integers `a` and `b`, print their product.",
    examples: [{ input: "a = 3, b = 4", output: "12" }],
    testCases: [
      { input: "3\n4", expected: "12" },
      { input: "0\n99", expected: "0" },
      { input: "-2\n5", expected: "-10" },
    ],
    starterCode: `a = int(input())\nb = int(input())\n# Your code here\n`,
  },
  {
    id: "largest-of-three",
    title: "Largest of Three",
    category: "math",
    difficulty: "easy",
    description: "Given three integers, print the largest one.",
    examples: [{ input: "1 5 3", output: "5" }],
    testCases: [
      { input: "1\n5\n3", expected: "5" },
      { input: "-1\n-5\n-2", expected: "-1" },
      { input: "7\n7\n7", expected: "7" },
    ],
    starterCode: `a = int(input())\nb = int(input())\nc = int(input())\n# Your code here\n`,
  },
  {
    id: "count-evens",
    title: "Count Even Numbers",
    category: "arrays",
    difficulty: "easy",
    description: "Given a list of integers, print how many of them are even.",
    examples: [{ input: "nums = [1, 2, 3, 4, 6]", output: "3" }],
    testCases: [
      { input: "[1, 2, 3, 4, 6]", expected: "3" },
      { input: "[1, 3, 5]", expected: "0" },
      { input: "[2, 4, 6, 8]", expected: "4" },
    ],
    starterCode: `nums = eval(input())\n# Your code here\n`,
  },
  {
    id: "first-last",
    title: "First and Last Element",
    category: "arrays",
    difficulty: "easy",
    description: "Given a list, print the first and last element separated by a space.",
    examples: [{ input: "nums = [10, 20, 30]", output: "10 30" }],
    testCases: [
      { input: "[10, 20, 30]", expected: "10 30" },
      { input: "[5]", expected: "5 5" },
      { input: "[1, 2]", expected: "1 2" },
    ],
    starterCode: `nums = eval(input())\n# Your code here\n`,
  },
  {
    id: "repeat-string",
    title: "Repeat String",
    category: "strings",
    difficulty: "easy",
    description: "Given a string `s` and integer `n`, print the string repeated `n` times with no spaces.",
    examples: [{ input: 's = "cat", n = 3', output: "catcatcat" }],
    testCases: [
      { input: "cat\n3", expected: "catcatcat" },
      { input: "hi\n1", expected: "hi" },
      { input: "ab\n4", expected: "abababab" },
    ],
    starterCode: `s = input()\nn = int(input())\n# Your code here\n`,
  },
  {
    id: "uppercase-string",
    title: "Uppercase String",
    category: "strings",
    difficulty: "easy",
    description: "Given a string `s`, print it in all uppercase.",
    examples: [{ input: 's = "hello"', output: "HELLO" }],
    testCases: [
      { input: "hello", expected: "HELLO" },
      { input: "Coding Cats", expected: "CODING CATS" },
      { input: "abc123", expected: "ABC123" },
    ],
    starterCode: `s = input()\n# Your code here\n`,
  },
  {
    id: "list-length",
    title: "List Length",
    category: "arrays",
    difficulty: "easy",
    description: "Given a list, print the number of elements in it.",
    examples: [{ input: "nums = [1, 2, 3, 4]", output: "4" }],
    testCases: [
      { input: "[1, 2, 3, 4]", expected: "4" },
      { input: "[]", expected: "0" },
      { input: "[99]", expected: "1" },
    ],
    starterCode: `nums = eval(input())\n# Your code here\n`,
  },
  {
    id: "absolute-value",
    title: "Absolute Value",
    category: "math",
    difficulty: "easy",
    description: "Given an integer `n`, print its absolute value.",
    examples: [
      { input: "n = -7", output: "7" },
      { input: "n = 3", output: "3" },
    ],
    testCases: [
      { input: "-7", expected: "7" },
      { input: "3", expected: "3" },
      { input: "0", expected: "0" },
    ],
    starterCode: `n = int(input())\n# Your code here\n`,
  },
  {
    id: "string-length",
    title: "String Length",
    category: "strings",
    difficulty: "easy",
    description: "Given a string `s`, print its length.",
    examples: [{ input: 's = "hello"', output: "5" }],
    testCases: [
      { input: "hello", expected: "5" },
      { input: "", expected: "0" },
      { input: "coding cats", expected: "11" },
    ],
    starterCode: `s = input()\n# Your code here\n`,
  },
  {
    id: "is-positive",
    title: "Is Positive",
    category: "math",
    difficulty: "easy",
    description: 'Given an integer `n`, print `"Yes"` if it is positive (greater than 0), otherwise print `"No"`.',
    examples: [
      { input: "n = 5", output: "Yes" },
      { input: "n = -3", output: "No" },
    ],
    testCases: [
      { input: "5", expected: "Yes" },
      { input: "-3", expected: "No" },
      { input: "0", expected: "No" },
    ],
    starterCode: `n = int(input())\n# Your code here\n`,
  },
  {
    id: "sort-list",
    title: "Sort a List",
    category: "arrays",
    difficulty: "easy",
    description: "Given a list of integers, print them sorted in ascending order, space-separated.",
    examples: [{ input: "nums = [3, 1, 4, 1, 5]", output: "1 1 3 4 5" }],
    testCases: [
      { input: "[3, 1, 4, 1, 5]", expected: "1 1 3 4 5" },
      { input: "[5, 4, 3, 2, 1]", expected: "1 2 3 4 5" },
      { input: "[42]", expected: "42" },
    ],
    starterCode: `nums = eval(input())\n# Your code here\n`,
  },
  {
    id: "average-list",
    title: "Average of List",
    category: "math",
    difficulty: "easy",
    description: "Given a list of numbers, print their average rounded to 2 decimal places.",
    examples: [{ input: "nums = [1, 2, 3, 4, 5]", output: "3.00" }],
    testCases: [
      { input: "[1, 2, 3, 4, 5]", expected: "3.00" },
      { input: "[10, 20]", expected: "15.00" },
      { input: "[7]", expected: "7.00" },
    ],
    starterCode: `nums = eval(input())\n# Your code here\n`,
  },
  {
    id: "starts-with",
    title: "Starts With",
    category: "strings",
    difficulty: "easy",
    description: 'Given a string `s` and a prefix `p`, print `"True"` if `s` starts with `p`, otherwise `"False"`.',
    examples: [
      { input: 's = "coding", p = "cod"', output: "True" },
      { input: 's = "cats", p = "dog"', output: "False" },
    ],
    testCases: [
      { input: "coding\ncod", expected: "True" },
      { input: "cats\ndog", expected: "False" },
      { input: "hello\nhello", expected: "True" },
    ],
    starterCode: `s = input()\np = input()\n# Your code here\n`,
  },

  {
    id: "whisker-math",
    title: "Whisker Math",
    category: "math",
    difficulty: "easy",
    description: "Every cat has exactly 24 whiskers. Given `n` cats, print the total number of whiskers.",
    examples: [
      { input: "n = 3", output: "72" },
      { input: "n = 0", output: "0" },
    ],
    testCases: [
      { input: "3", expected: "72" },
      { input: "1", expected: "24" },
      { input: "0", expected: "0" },
      { input: "10", expected: "240" },
    ],
    starterCode: `n = int(input())\n# Your code here\n`,
  },
  {
    id: "purr-or-hiss",
    title: "Purr or Hiss",
    category: "math",
    difficulty: "easy",
    description:
      'A cat purrs for multiples of 3 and hisses for multiples of 5. Given `n`, print numbers 1 through `n` on separate lines, replacing:\n- Multiples of 3 with `"Purr"`\n- Multiples of 5 with `"Hiss"`\n- Multiples of both with `"PurrHiss"`',
    examples: [{ input: "n = 5", output: "1\n2\nPurr\n4\nHiss" }],
    testCases: [
      { input: "5", expected: "1\n2\nPurr\n4\nHiss" },
      {
        input: "15",
        expected: "1\n2\nPurr\n4\nHiss\nPurr\n7\n8\nPurr\nHiss\n11\nPurr\n13\n14\nPurrHiss",
      },
    ],
    starterCode: `n = int(input())\n# Your code here\n`,
  },
  {
    id: "count-the-naps",
    title: "Count the Naps",
    category: "arrays",
    difficulty: "easy",
    description:
      'Mittens had a busy day. Given a list of activities, count how many times she took a `"nap"`.',
    examples: [
      { input: 'activities = ["nap", "eat", "nap", "play", "nap"]', output: "3" },
      { input: 'activities = ["eat", "play"]', output: "0" },
    ],
    testCases: [
      { input: '["nap", "eat", "nap", "play", "nap"]', expected: "3" },
      { input: '["eat", "play"]', expected: "0" },
      { input: '["nap"]', expected: "1" },
      { input: '["nap", "nap", "nap", "nap"]', expected: "4" },
    ],
    starterCode: `activities = eval(input())\n# Your code here\n`,
  },
  {
    id: "cat-name-formatter",
    title: "Cat Name Formatter",
    category: "strings",
    difficulty: "easy",
    description:
      "The shelter received a cat's name in all lowercase. Format it properly by printing it in title case (capitalize the first letter of each word).",
    examples: [
      { input: 's = "whisker bell"', output: "Whisker Bell" },
      { input: 's = "mr. fluffy paws"', output: "Mr. Fluffy Paws" },
    ],
    testCases: [
      { input: "whisker bell", expected: "Whisker Bell" },
      { input: "mr. fluffy paws", expected: "Mr. Fluffy Paws" },
      { input: "luna", expected: "Luna" },
      { input: "sir meows a lot", expected: "Sir Meows A Lot" },
    ],
    starterCode: `name = input()\n# Your code here\n`,
  },
  {
    id: "cat-color-census",
    title: "Cat Color Census",
    category: "hashmap",
    difficulty: "easy",
    description:
      "The cat shelter is taking a census! Given a list of cat coat colors, print each unique color and how many cats have it. Print in the order colors first appear, formatted as `color:count`.",
    examples: [
      {
        input: 'colors = ["orange", "black", "orange", "white", "black", "orange"]',
        output: "orange:3\nblack:2\nwhite:1",
      },
    ],
    testCases: [
      { input: '["orange", "black", "orange", "white", "black", "orange"]', expected: "orange:3\nblack:2\nwhite:1" },
      { input: '["tabby"]', expected: "tabby:1" },
      { input: '["grey", "grey", "grey"]', expected: "grey:3" },
      { input: '["calico", "tuxedo", "calico"]', expected: "calico:2\ntuxedo:1" },
    ],
    starterCode: `colors = eval(input())\n# Your code here\n`,
  },
  {
    id: "kibble-split",
    title: "Kibble Split",
    category: "math",
    difficulty: "easy",
    description:
      "It's dinner time! Given `n` kibbles and `k` cats, print how many kibbles each cat gets (integer division), then print the leftover kibbles on the next line.",
    examples: [
      { input: "n = 10, k = 3", output: "3\n1", explanation: "Each cat gets 3 kibbles, 1 left over." },
    ],
    testCases: [
      { input: "10\n3", expected: "3\n1" },
      { input: "20\n4", expected: "5\n0" },
      { input: "7\n2", expected: "3\n1" },
      { input: "9\n9", expected: "1\n0" },
    ],
    starterCode: `n = int(input())\nk = int(input())\n# Your code here\n`,
  },
  {
    id: "meow-printer",
    title: "Meow Printer",
    category: "strings",
    difficulty: "easy",
    description: 'The cat is feeling chatty. Given `n`, print `"meow"` on `n` separate lines.',
    examples: [{ input: "n = 3", output: "meow\nmeow\nmeow" }],
    testCases: [
      { input: "3", expected: "meow\nmeow\nmeow" },
      { input: "1", expected: "meow" },
      { input: "5", expected: "meow\nmeow\nmeow\nmeow\nmeow" },
    ],
    starterCode: `n = int(input())\n# Your code here\n`,
  },
  {
    id: "cat-toy-sorter",
    title: "Cat Toy Sorter",
    category: "arrays",
    difficulty: "easy",
    description:
      "Luna's toy box has duplicates! Given a list of toy names, remove duplicates and print the remaining unique toys sorted alphabetically, one per line.",
    examples: [
      {
        input: 'toys = ["ball", "string", "ball", "feather", "string"]',
        output: "ball\nfeather\nstring",
      },
    ],
    testCases: [
      { input: '["ball", "string", "ball", "feather", "string"]', expected: "ball\nfeather\nstring" },
      { input: '["mouse"]', expected: "mouse" },
      { input: '["yarn", "bell", "yarn"]', expected: "bell\nyarn" },
      { input: '["wand", "wand", "wand"]', expected: "wand" },
    ],
    starterCode: `toys = eval(input())\n# Your code here\n`,
  },
  {
    id: "cat-age-converter",
    title: "Cat Age Converter",
    category: "math",
    difficulty: "easy",
    description:
      "Convert a cat's age to human years! Each cat year equals 7 human years. Given a cat's age, print its age in human years.",
    examples: [
      { input: "age = 3", output: "21" },
      { input: "age = 1", output: "7" },
    ],
    testCases: [
      { input: "3", expected: "21" },
      { input: "1", expected: "7" },
      { input: "10", expected: "70" },
      { input: "0", expected: "0" },
    ],
    starterCode: `age = int(input())\n# Your code here\n`,
  },
  {
    id: "longest-cat-name",
    title: "Longest Cat Name",
    category: "strings",
    difficulty: "easy",
    description:
      "The cat naming contest is over! Given a list of cat names, print the longest one. If two names are the same length, print the one that appears first.",
    examples: [
      {
        input: 'names = ["Luna", "Whiskers", "Mittens", "Cat"]',
        output: "Whiskers",
      },
    ],
    testCases: [
      { input: '["Luna", "Whiskers", "Mittens", "Cat"]', expected: "Whiskers" },
      { input: '["Bo"]', expected: "Bo" },
      { input: '["Max", "Leo"]', expected: "Max" },
      { input: '["Cleo", "Nala", "Zara"]', expected: "Cleo" },
    ],
    starterCode: `names = eval(input())\n# Your code here\n`,
  },

  // ===== MEDIUM =====
  {
    id: "max-subarray",
    title: "Maximum Subarray Sum",
    category: "dp",
    difficulty: "medium",
    description:
      "Given a list of integers `nums`, find the contiguous subarray (containing at least one number) which has the largest sum, and print that sum.",
    examples: [
      {
        input: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
        output: "6",
        explanation: "The subarray [4, -1, 2, 1] has the largest sum = 6.",
      },
    ],
    testCases: [
      { input: "[-2, 1, -3, 4, -1, 2, 1, -5, 4]", expected: "6" },
      { input: "[1]", expected: "1" },
      { input: "[-1, -2, -3]", expected: "-1" },
      { input: "[5, 4, -1, 7, 8]", expected: "23" },
    ],
    starterCode: `def max_subarray(nums):
    # Your code here
    pass

nums = eval(input())
print(max_subarray(nums))
`,
  },
  {
    id: "group-anagrams",
    title: "Group Anagrams",
    category: "hashmap",
    difficulty: "medium",
    description:
      'Given a list of strings `words`, group the anagrams together.\n\nPrint each group on its own line, with words separated by spaces, sorted alphabetically within each group. Print groups in the order their first word appears in the input.',
    examples: [
      {
        input: 'words = ["eat", "tea", "tan", "ate", "nat", "bat"]',
        output: "ate eat tea\nnat tan\nbat",
      },
    ],
    testCases: [
      {
        input: '["eat", "tea", "tan", "ate", "nat", "bat"]',
        expected: "ate eat tea\nnat tan\nbat",
      },
      { input: '["a"]', expected: "a" },
      { input: '["", ""]', expected: "" },
    ],
    starterCode: `def group_anagrams(words):
    # Your code here
    pass

words = eval(input())
group_anagrams(words)
`,
  },
  {
    id: "product-except-self",
    title: "Product Except Self",
    category: "arrays",
    difficulty: "medium",
    description:
      "Given a list of integers `nums`, return a list where each element is the product of all elements in `nums` except the one at that index.\n\nPrint the result as space-separated integers. Do not use division.",
    examples: [
      {
        input: "nums = [1, 2, 3, 4]",
        output: "24 12 8 6",
        explanation:
          "For index 0: 2*3*4=24, index 1: 1*3*4=12, index 2: 1*2*4=8, index 3: 1*2*3=6",
      },
    ],
    testCases: [
      { input: "[1, 2, 3, 4]", expected: "24 12 8 6" },
      { input: "[-1, 1, 0, -3, 3]", expected: "0 0 9 0 0" },
      { input: "[2, 3]", expected: "3 2" },
    ],
    starterCode: `def product_except_self(nums):
    # Your code here
    pass

nums = eval(input())
result = product_except_self(nums)
print(" ".join(map(str, result)))
`,
  },
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    category: "dp",
    difficulty: "medium",
    description:
      "You are climbing a staircase with `n` steps. Each time you can climb 1 or 2 steps. Print the number of distinct ways you can climb to the top.",
    examples: [
      {
        input: "n = 3",
        output: "3",
        explanation: "Three ways: 1+1+1, 1+2, 2+1",
      },
    ],
    testCases: [
      { input: "2", expected: "2" },
      { input: "3", expected: "3" },
      { input: "5", expected: "8" },
      { input: "10", expected: "89" },
    ],
    starterCode: `def climb_stairs(n):
    # Your code here
    pass

n = int(input())
print(climb_stairs(n))
`,
  },

  {
    id: "catnip-fibonacci",
    title: "Catnip Fibonacci",
    category: "dp",
    difficulty: "medium",
    description:
      "After eating catnip, Pixel the cat does zoomies in a Fibonacci pattern. On day 1 she does 1 zoomie, on day 2 she does 1 zoomie, and each day after she does the sum of the previous two days. Given `n`, print the number of zoomies on day `n`.",
    examples: [
      { input: "n = 7", output: "13" },
      { input: "n = 10", output: "55" },
    ],
    testCases: [
      { input: "1", expected: "1" },
      { input: "2", expected: "1" },
      { input: "7", expected: "13" },
      { input: "10", expected: "55" },
    ],
    starterCode: `def catnip_fibonacci(n):
    # Your code here
    pass

n = int(input())
print(catnip_fibonacci(n))
`,
  },
  {
    id: "cat-treat-combos",
    title: "Cat Treat Combos",
    category: "dp",
    difficulty: "medium",
    description:
      "Biscuit the cat wants to eat exactly `n` treats. Each time, she can eat 1, 2, or 3 treats. Print the number of distinct ways she can finish all `n` treats.",
    examples: [
      {
        input: "n = 4",
        output: "7",
        explanation: "1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2, 1+3, 3+1",
      },
    ],
    testCases: [
      { input: "1", expected: "1" },
      { input: "2", expected: "2" },
      { input: "3", expected: "4" },
      { input: "4", expected: "7" },
      { input: "5", expected: "13" },
    ],
    starterCode: `def treat_combos(n):
    # Your code here
    pass

n = int(input())
print(treat_combos(n))
`,
  },
  {
    id: "cat-leap",
    title: "Cat Leap",
    category: "arrays",
    difficulty: "medium",
    description:
      "Mochi the cat is leaping across stepping stones. Given a list where each element is the maximum number of steps she can jump from that position, print `\"True\"` if she can reach the last stone, or `\"False\"` if she gets stuck.",
    examples: [
      { input: "stones = [2, 3, 1, 1, 4]", output: "True" },
      {
        input: "stones = [3, 2, 1, 0, 4]",
        output: "False",
        explanation: "Gets stuck at position 3 which has 0 jump.",
      },
    ],
    testCases: [
      { input: "[2, 3, 1, 1, 4]", expected: "True" },
      { input: "[3, 2, 1, 0, 4]", expected: "False" },
      { input: "[0]", expected: "True" },
      { input: "[2, 0, 0]", expected: "True" },
    ],
    starterCode: `def can_reach_end(stones):
    # Your code here
    pass

stones = eval(input())
print(can_reach_end(stones))
`,
  },
  {
    id: "cat-bracket-balance",
    title: "Cat Bracket Balance",
    category: "hashmap",
    difficulty: "medium",
    description:
      'Whiskers knocked over a pile of brackets! Given a string of brackets (`(`, `)`, `[`, `]`, `{`, `}`), print `"Balanced"` if every opening bracket has a matching closing bracket in the correct order, otherwise print `"Unbalanced"`.',
    examples: [
      { input: 's = "(()[]{})"', output: "Balanced" },
      { input: 's = "([)]"', output: "Unbalanced" },
    ],
    testCases: [
      { input: "(()[]{})", expected: "Balanced" },
      { input: "([)]", expected: "Unbalanced" },
      { input: "", expected: "Balanced" },
      { input: "{[]}", expected: "Balanced" },
      { input: "(((",  expected: "Unbalanced" },
    ],
    starterCode: `def is_balanced(s):
    # Your code here
    pass

s = input()
print(is_balanced(s))
`,
  },
  {
    id: "cat-name-groups",
    title: "Cat Name Groups",
    category: "strings",
    difficulty: "medium",
    description:
      "The cat shelter is organizing cats alphabetically! Given a list of cat names, group them by their first letter. Print groups in alphabetical order of the letter, with names sorted alphabetically within each group. Format each line as `X: Name1 Name2`.",
    examples: [
      {
        input: 'names = ["Bella", "Ash", "Atlas", "Buddy", "Cleo"]',
        output: "A: Ash Atlas\nB: Bella Buddy\nC: Cleo",
      },
    ],
    testCases: [
      { input: '["Bella", "Ash", "Atlas", "Buddy", "Cleo"]', expected: "A: Ash Atlas\nB: Bella Buddy\nC: Cleo" },
      { input: '["Luna"]', expected: "L: Luna" },
      { input: '["Zara", "Zoe", "Ace"]', expected: "A: Ace\nZ: Zara Zoe" },
    ],
    starterCode: `def group_by_letter(names):
    # Your code here
    pass

names = eval(input())
group_by_letter(names)
`,
  },

  // ===== HARD =====
  {
    id: "longest-substring",
    title: "Longest Substring Without Repeating",
    category: "hashmap",
    difficulty: "hard",
    description:
      "Given a string `s`, find the length of the longest substring without repeating characters.\n\nPrint the length.",
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc" with length 3.',
      },
      { input: 's = "bbbbb"', output: "1" },
    ],
    testCases: [
      { input: "abcabcbb", expected: "3" },
      { input: "bbbbb", expected: "1" },
      { input: "pwwkew", expected: "3" },
      { input: "", expected: "0" },
    ],
    starterCode: `def length_of_longest_substring(s):
    # Your code here
    pass

s = input()
print(length_of_longest_substring(s))
`,
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    category: "arrays",
    difficulty: "hard",
    description:
      "Given a list of intervals `[start, end]`, merge all overlapping intervals and print the result.\n\nPrint each merged interval on its own line as `start end`.",
    examples: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "1 6\n8 10\n15 18",
      },
    ],
    testCases: [
      {
        input: "[[1,3],[2,6],[8,10],[15,18]]",
        expected: "1 6\n8 10\n15 18",
      },
      { input: "[[1,4],[4,5]]", expected: "1 5" },
      { input: "[[1,4],[0,4]]", expected: "0 4" },
    ],
    starterCode: `def merge_intervals(intervals):
    # Your code here
    pass

intervals = eval(input())
merge_intervals(intervals)
`,
  },
  {
    id: "coin-change",
    title: "Coin Change",
    category: "dp",
    difficulty: "hard",
    description:
      "Given a list of coin denominations `coins` and a target `amount`, print the minimum number of coins needed to make up that amount. If it's not possible, print `-1`.",
    examples: [
      {
        input: "coins = [1, 5, 10, 25], amount = 30",
        output: "2",
        explanation: "25 + 5 = 30, using 2 coins.",
      },
      { input: "coins = [2], amount = 3", output: "-1" },
    ],
    testCases: [
      { input: "[1, 5, 10, 25]\n30", expected: "2" },
      { input: "[2]\n3", expected: "-1" },
      { input: "[1]\n0", expected: "0" },
      { input: "[1, 2, 5]\n11", expected: "3" },
    ],
    starterCode: `def coin_change(coins, amount):
    # Your code here
    pass

coins = eval(input())
amount = int(input())
print(coin_change(coins, amount))
`,
  },
  {
    id: "longest-hunting-streak",
    title: "Longest Hunting Streak",
    category: "dp",
    difficulty: "hard",
    description:
      "Nala the cat records the size of each prey she catches. Find the length of her longest strictly increasing hunting streak — the longest subsequence of prey sizes where each is larger than the last (the elements don't need to be contiguous).\n\nPrint the length.",
    examples: [
      {
        input: "prey = [10, 9, 2, 5, 3, 7, 101, 18]",
        output: "4",
        explanation: "Longest increasing subsequence: [2, 3, 7, 101] or [2, 5, 7, 101]",
      },
    ],
    testCases: [
      { input: "[10, 9, 2, 5, 3, 7, 101, 18]", expected: "4" },
      { input: "[0, 1, 0, 3, 2, 3]", expected: "4" },
      { input: "[7, 7, 7, 7, 7]", expected: "1" },
      { input: "[1, 2, 3, 4, 5]", expected: "5" },
    ],
    starterCode: `def longest_hunting_streak(prey):
    # Your code here
    pass

prey = eval(input())
print(longest_hunting_streak(prey))
`,
  },
  {
    id: "cat-nap-scheduler",
    title: "Cat Nap Scheduler",
    category: "arrays",
    difficulty: "hard",
    description:
      "Sleepy the cat wants to fit in as many non-overlapping naps as possible. Given a list of `[start, end]` nap windows, print the maximum number of naps she can take without any two overlapping. A nap starting exactly when another ends is allowed.",
    examples: [
      {
        input: "naps = [[1, 3], [2, 4], [3, 5], [4, 6]]",
        output: "2",
      },
      {
        input: "naps = [[1, 2], [2, 3], [3, 4]]",
        output: "3",
        explanation: "All three naps are back-to-back with no overlap.",
      },
    ],
    testCases: [
      { input: "[[1, 3], [2, 4], [3, 5], [4, 6]]", expected: "2" },
      { input: "[[1, 2], [2, 3], [3, 4]]", expected: "3" },
      { input: "[[1, 10], [2, 3], [4, 5]]", expected: "2" },
      { input: "[[1, 2]]", expected: "1" },
    ],
    starterCode: `def max_naps(naps):
    # Your code here
    pass

naps = eval(input())
print(max_naps(naps))
`,
  },
  {
    id: "cat-string-compression",
    title: "Cat String Compression",
    category: "strings",
    difficulty: "hard",
    description:
      "Encode a cat's meow pattern using run-length encoding. Given a string, compress consecutive repeated characters into `char + count` pairs. Print the compressed string.",
    examples: [
      {
        input: 's = "aabcccdddd"',
        output: "a2b1c3d4",
      },
      {
        input: 's = "mmmeeeooww"',
        output: "m3e3o2w2",
      },
    ],
    testCases: [
      { input: "aabcccdddd", expected: "a2b1c3d4" },
      { input: "abc", expected: "a1b1c1" },
      { input: "aaaa", expected: "a4" },
      { input: "aabbaabb", expected: "a2b2a2b2" },
    ],
    starterCode: `def compress(s):
    # Your code here
    pass

s = input()
print(compress(s))
`,
  },
  {
    id: "cat-treat-budget",
    title: "Cat Treat Budget",
    category: "dp",
    difficulty: "hard",
    description:
      "Cookie the cat is at the treat store! She has a weight limit in her treat bag. Given a list of treat weights, a list of treat values (tastiness), and a maximum capacity, print the maximum total tastiness she can carry.\n\nEach treat can only be taken once.",
    examples: [
      {
        input: "weights = [2, 3, 4, 5], values = [3, 4, 5, 6], capacity = 5",
        output: "7",
        explanation: "Take treats 0 and 1: weight 2+3=5, tastiness 3+4=7.",
      },
    ],
    testCases: [
      { input: "[2, 3, 4, 5]\n[3, 4, 5, 6]\n5", expected: "7" },
      { input: "[1, 2, 3]\n[1, 2, 3]\n5", expected: "5" },
      { input: "[10]\n[100]\n5", expected: "0" },
      { input: "[1, 1, 1]\n[5, 5, 5]\n2", expected: "10" },
    ],
    starterCode: `def max_tastiness(weights, values, capacity):
    # Your code here
    pass

weights = eval(input())
values = eval(input())
capacity = int(input())
print(max_tastiness(weights, values, capacity))
`,
  },
];

export function getRandomProblem(solvedIds: string[] = []): Problem {
  const unsolved = PROBLEMS.filter((p) => !solvedIds.includes(p.id));
  const pool = unsolved.length > 0 ? unsolved : PROBLEMS;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getRandomByDifficulty(
  difficulty: Difficulty,
  solvedIds: string[] = []
): Problem {
  const matching = PROBLEMS.filter((p) => p.difficulty === difficulty);
  const unsolved = matching.filter((p) => !solvedIds.includes(p.id));
  const pool = unsolved.length > 0 ? unsolved : matching;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getDailyChoices(solvedIds: string[] = []): {
  easy: Problem;
  medium: Problem;
  hard: Problem;
} {
  return {
    easy: getRandomByDifficulty("easy", solvedIds),
    medium: getRandomByDifficulty("medium", solvedIds),
    hard: getRandomByDifficulty("hard", solvedIds),
  };
}

export function getProblemById(id: string): Problem | undefined {
  return PROBLEMS.find((p) => p.id === id);
}
