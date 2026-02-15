const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com";
const PYTHON3_ID = 71;

// Users need to get a free API key from https://rapidapi.com/judge0-official/api/judge0-ce
// For now we'll use a placeholder — set this in .env.local as NEXT_PUBLIC_JUDGE0_KEY
function getApiKey(): string {
  return process.env.NEXT_PUBLIC_JUDGE0_KEY || "";
}

interface Submission {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  status: { id: number; description: string };
  time: string;
}

export interface TestResult {
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
  error?: string;
}

async function submitCode(
  code: string,
  stdin: string
): Promise<Submission> {
  const apiKey = getApiKey();

  const res = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    body: JSON.stringify({
      source_code: code,
      language_id: PYTHON3_ID,
      stdin: stdin,
    }),
  });

  if (!res.ok) {
    throw new Error(`Judge0 API error: ${res.status}`);
  }

  return res.json();
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
