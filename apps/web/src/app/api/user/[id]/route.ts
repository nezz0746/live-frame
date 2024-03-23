import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/prisma";

type Params = {
  id: string;
};

export async function GET(_: NextRequest, { params }: { params: Params }) {
  const id = params.id;

  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      stream: true,
    },
  });

  return NextResponse.json(user);
}
