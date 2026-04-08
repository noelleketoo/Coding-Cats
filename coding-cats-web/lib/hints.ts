// Hints for problems — looked up by problem ID in SolveModal
export const HINTS: Record<string, string> = {
  // Arrays
  "two-sum": "Use a dictionary to store each number and its index as you loop. For each number, check if (target - number) is already in the dictionary.",
  "sum-of-list": "Loop through the list and keep a running total, or use Python's built-in sum() function.",
  "find-maximum": "Keep track of the largest number seen so far as you loop, or use Python's built-in max() function.",
  "count-evens": "Loop through the list and use the modulo operator (%) to check if each number is divisible by 2.",
  "first-last": "You can access the first element with nums[0] and the last with nums[-1].",
  "list-length": "Python's built-in len() function returns the number of elements in a list.",
  "sort-list": "Python's sorted() function returns a new sorted list. Use ' '.join(map(str, ...)) to print space-separated.",
  "count-the-naps": "Use list.count('nap') or loop through and count with a variable.",
  "cat-toy-sorter": "Convert to a set to remove duplicates, then sort: sorted(set(toys)).",

  // Strings
  "reverse-string": "Python strings can be reversed with slicing: s[::-1].",
  "palindrome-check": "Compare the string to its reverse: s.lower() == s.lower()[::-1].",
  "count-vowels": "Loop through the string and check if each character is in 'aeiou'. Use s.lower() to ignore case.",
  "count-words": "Use s.split() — it splits on whitespace and returns a list of words.",
  "repeat-string": "Use the * operator: s * n.",
  "uppercase-string": "Use s.upper().",
  "string-length": "Use len(s).",
  "starts-with": "Use s.startswith(p).",
  "print-hello": "Just print the string directly: print('Hello, World!')",
  "cat-name-formatter": "Use s.title() to capitalize the first letter of each word.",
  "longest-cat-name": "Loop through the names and track the longest one seen so far.",
  "meow-printer": "Use a for loop with range(n) and print('meow') each iteration.",

  // Math
  "fizzbuzz": "Check divisibility by 15 first (both 3 and 5), then 3, then 5, otherwise the number.",
  "even-or-odd": "Use the modulo operator: n % 2 == 0 means even.",
  "sum-of-digits": "Convert the number to a string, loop over each character, and sum int(char).",
  "square-number": "Use n ** 2 or n * n.",
  "add-two-numbers": "Just print a + b.",
  "multiply-two": "Just print a * b.",
  "largest-of-three": "Use Python's max() function: max(a, b, c).",
  "absolute-value": "Use Python's abs() function.",
  "is-positive": "Check if n > 0.",
  "average-list": "sum(nums) / len(nums) gives the average. Use round() or f-string with :.2f.",
  "whisker-math": "Multiply n by 24.",
  "purr-or-hiss": "Same as FizzBuzz — check % 15 first, then % 3, then % 5.",
  "kibble-split": "Use // for integer division and % for remainder.",
  "cat-age-converter": "Multiply age by 7.",

  // Hashmap
  "character-count": "Use a dictionary. For each char: d[char] = d.get(char, 0) + 1.",
  "contains-duplicate": "Use a set — if len(set(nums)) < len(nums), there are duplicates.",
  "cat-color-census": "Use a dict to count colors. Loop in insertion order (Python 3.7+ dicts maintain order).",
  "cat-name-groups": "Use a dict keyed by the first letter. Sort keys and names before printing.",

  // DP
  "max-subarray": "Kadane's algorithm: track current_sum and max_sum. At each step: current_sum = max(num, current_sum + num).",
  "climbing-stairs": "This is Fibonacci! dp[i] = dp[i-1] + dp[i-2]. Start with dp[1]=1, dp[2]=2.",
  "catnip-fibonacci": "dp[n] = dp[n-1] + dp[n-2] with dp[1]=1, dp[2]=1.",
  "cat-treat-combos": "dp[n] = dp[n-1] + dp[n-2] + dp[n-3] with dp[0]=1, dp[1]=1, dp[2]=2.",
  "cat-leap": "Track the furthest reachable index. Loop through each position: if i > max_reach, you're stuck.",

  // Medium/Hard
  "group-anagrams": "Sort each word alphabetically to get a key. Words with the same sorted key are anagrams.",
  "product-except-self": "Use two passes: left products and right products. For index i: result[i] = left[i] * right[i].",
  "longest-substring": "Use a sliding window with a set. Expand right, shrink from left when a duplicate is found.",
  "merge-intervals": "Sort intervals by start time. Merge when current start <= previous end.",
  "coin-change": "dp[i] = minimum coins to make amount i. For each coin, dp[i] = min(dp[i], dp[i-coin] + 1).",
  "cat-bracket-balance": "Use a stack. Push opening brackets, pop and check when you see a closing bracket.",
  "longest-hunting-streak": "dp[i] = length of longest increasing subsequence ending at i. For each j < i, if prey[j] < prey[i]: dp[i] = max(dp[i], dp[j]+1).",
  "cat-nap-scheduler": "Sort naps by end time. Greedily pick naps that end earliest and don't overlap.",
  "cat-string-compression": "Loop through the string tracking the current character and its count. When the character changes, write char+count.",
  "cat-treat-budget": "Classic 0/1 knapsack: dp[w] = max tastiness using capacity w. Loop items, loop capacity backwards.",
};
