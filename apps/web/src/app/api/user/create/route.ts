import prisma from "@lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { fid } = (await req.json()) as { fid: string };

  const user_response = await prisma.user.create({
    data: {
      id: fid,
    },
  });

  return NextResponse.json(user_response);
}
