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
