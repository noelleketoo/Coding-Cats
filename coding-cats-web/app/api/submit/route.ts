import { NextRequest, NextResponse } from "next/server";

const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com";
const PYTHON3_ID = 71;

export async function POST(req: NextRequest) {
  const { code, stdin } = await req.json();
  const apiKey = process.env.NEXT_PUBLIC_JUDGE0_KEY || "";

  const res = await fetch(
    `${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify({
        source_code: code,
        language_id: PYTHON3_ID,
        stdin,
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json(
      { error: `Judge0 error: ${res.status} ${text}` },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
