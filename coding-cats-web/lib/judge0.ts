export interface TestResult {
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
  error?: string;
}

interface Submission {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  status: { id: number; description: string };
}

async function submitCode(code: string, stdin: string): Promise<Submission> {
  const res = await fetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, stdin }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `API error: ${res.status}`);
  }

  return data;
}

export async function runTests(
  code: string,
  testCases: { input: string; expected: string }[]
): Promise<TestResult[]> {
  const results: TestResult[] = [];

  for (const tc of testCases) {
    try {
      const submission = await submitCode(code, tc.input);
      const actual = (submission.stdout || "").trim();
      const error =
        submission.stderr || submission.compile_output || undefined;

      results.push({
        input: tc.input,
        expected: tc.expected,
        actual,
        passed: actual === tc.expected.trim(),
        error: error || undefined,
      });
    } catch (e) {
      results.push({
        input: tc.input,
        expected: tc.expected,
        actual: "",
        passed: false,
        error: e instanceof Error ? e.message : "Unknown error",
      });
    }
  }

  return results;
}
