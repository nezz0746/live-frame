import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: Response) {
  return NextResponse.json({ message: "Hello, World!" });
}
