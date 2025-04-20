// app/api/deploy/route.ts

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const code = body.code;

    console.log("Received code from frontend:", code);

    // Simulate deployment logic (replace this with real logic if needed)
    const fakeOutput = `Contract received and deployed: ${code.slice(0, 30)}...`;

    return NextResponse.json({ success: true, output: fakeOutput });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to deploy contract." },
      { status: 500 }
    );
  }
}
