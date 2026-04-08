"use client";

interface Section {
  title: string;
  items: { label: string; code: string }[];
}

const SECTIONS: Section[] = [
  {
    title: "Variables & Types",
    items: [
      { label: "Integer", code: "x = 5" },
      { label: "Float", code: "x = 3.14" },
      { label: "String", code: 'x = "hello"' },
      { label: "Boolean", code: "x = True  # or False" },
      { label: "None", code: "x = None" },
      { label: "Type check", code: "type(x)" },
      { label: "Type cast", code: "int(x), float(x), str(x)" },
    ],
  },
  {
    title: "Strings",
    items: [
      { label: "Length", code: "len(s)" },
      { label: "Uppercase / Lowercase", code: "s.upper()  s.lower()" },
      { label: "Trim whitespace", code: "s.strip()" },
      { label: "Split", code: 's.split(" ")' },
      { label: "Join", code: '" ".join(list)' },
      { label: "Replace", code: 's.replace("a", "b")' },
      { label: "Starts / Ends with", code: "s.startswith(p)  s.endswith(p)" },
      { label: "Slice", code: "s[1:4]  s[::-1]" },
      { label: "f-string", code: 'f"Hello {name}!"' },
    ],
  },
  {
    title: "Lists",
    items: [
      { label: "Create", code: "nums = [1, 2, 3]" },
      { label: "Append", code: "nums.append(4)" },
      { label: "Remove", code: "nums.remove(2)" },
      { label: "Pop", code: "nums.pop()  # removes last" },
      { label: "Length", code: "len(nums)" },
      { label: "Sort", code: "nums.sort()  # in-place" },
      { label: "Sorted (new)", code: "sorted(nums)" },
      { label: "Reverse", code: "nums.reverse()" },
      { label: "Slice", code: "nums[1:3]" },
      { label: "Index", code: "nums.index(val)" },
      { label: "Count", code: "nums.count(val)" },
    ],
  },
  {
    title: "Dictionaries",
    items: [
      { label: "Create", code: 'd = {"key": "value"}' },
      { label: "Get", code: 'd["key"]  or  d.get("key")' },
      { label: "Set", code: 'd["key"] = val' },
      { label: "Delete", code: 'del d["key"]' },
      { label: "Keys / Values", code: "d.keys()  d.values()" },
      { label: "Check key", code: '"key" in d' },
      { label: "Default get", code: 'd.get("key", 0)' },
    ],
  },
  {
    title: "Control Flow",
    items: [
      { label: "If / elif / else", code: "if x > 0:\n    ...\nelif x == 0:\n    ...\nelse:\n    ..." },
      { label: "For loop", code: "for i in range(n):\n    ..." },
      { label: "For over list", code: "for item in items:\n    ..." },
      { label: "While loop", code: "while x > 0:\n    x -= 1" },
      { label: "Break / Continue", code: "break  # exit loop\ncontinue  # skip iteration" },
    ],
  },
  {
    title: "Functions",
    items: [
      { label: "Define", code: "def greet(name):\n    return f'Hi {name}'" },
      { label: "Default arg", code: "def greet(name='cat'):" },
      { label: "Multiple return", code: "return x, y" },
      { label: "Lambda", code: "f = lambda x: x * 2" },
    ],
  },
  {
    title: "Math & Operators",
    items: [
      { label: "Basic ops", code: "+ - * / // % **" },
      { label: "Floor divide", code: "7 // 2  # = 3" },
      { label: "Modulo", code: "7 % 2   # = 1" },
      { label: "Power", code: "2 ** 8  # = 256" },
      { label: "Min / Max", code: "min(a, b)  max(a, b)" },
      { label: "Abs", code: "abs(-5)  # = 5" },
      { label: "Round", code: "round(3.14, 1)  # = 3.1" },
      { label: "Import math", code: "import math\nmath.sqrt(16)" },
    ],
  },
  {
    title: "Useful Built-ins",
    items: [
      { label: "Range", code: "range(5)  range(1,10)  range(0,10,2)" },
      { label: "Enumerate", code: "for i, v in enumerate(list):" },
      { label: "Zip", code: "for a, b in zip(list1, list2):" },
      { label: "Sum", code: "sum(nums)" },
      { label: "Any / All", code: "any(nums)  all(nums)" },
      { label: "List comprehension", code: "[x*2 for x in nums if x > 0]" },
      { label: "Input", code: "x = int(input())" },
      { label: "Print", code: 'print(x, y, sep=", ", end="\\n")' },
    ],
  },
];

export default function CheatSheetModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-amber-50 border-4 border-yellow-700 rounded-2xl shadow-2xl w-[90vw] max-w-3xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 bg-yellow-800 border-b-4 border-yellow-700">
          <h2 className="text-white text-sm">Python Cheat Sheet</h2>
          <button onClick={onClose} className="text-yellow-200 hover:text-white text-lg">x</button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {SECTIONS.map((section) => (
            <div key={section.title} className="bg-white border-2 border-yellow-200 rounded-xl overflow-hidden">
              <div className="bg-yellow-700 px-4 py-2">
                <h3 className="text-white text-xs">{section.title}</h3>
              </div>
              <div className="divide-y divide-yellow-100">
                {section.items.map((item) => (
                  <div key={item.label} className="flex gap-3 px-4 py-2 items-start">
                    <span className="text-yellow-800 text-xs w-32 shrink-0 pt-0.5">{item.label}</span>
                    <code className="text-xs text-gray-700 font-mono whitespace-pre">{item.code}</code>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
