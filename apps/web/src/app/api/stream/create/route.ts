import prisma from "@lib/prisma";
import { Livepeer } from "livepeer";
import { Stream } from "livepeer/dist/models/components";
import { NextRequest, NextResponse } from "next/server";

const livepeer = new Livepeer({ apiKey: process.env.LIVEPEER_API_KEY });

export async function POST(req: NextRequest, res: NextResponse) {
  const { userId } = (await req.json()) as { userId: string };

  const streamData = {
    name: "ALWAYS_ON: Stream for user " + userId,
  };

  const stream = (await livepeer.stream
    .create(streamData)
    .then((res) => JSON.parse(res.rawResponse?.data.toString()))) as Stream;

  if (!stream.streamKey) {
    throw new Error("Stream key not found");
  }

  const stream_response = await prisma.stream.create({
    data: {
      key: stream.streamKey,
      userId,
    },
  });

  return NextResponse.json(stream_response);
}
