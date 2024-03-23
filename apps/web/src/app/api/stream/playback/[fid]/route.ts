import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/prisma";
import { Livepeer } from "livepeer";
import { PlaybackInfo } from "livepeer/dist/models/components";

type Params = {
  fid: string;
};

const livepeer = new Livepeer({ apiKey: process.env.LIVEPEER_API_KEY });

export async function GET(_: NextRequest, { params }: { params: Params }) {
  const fid = params.fid;

  const user = await prisma.user.findFirst({
    where: {
      id: fid,
    },
    include: {
      stream: true,
    },
  });

  const playbackId = user?.stream?.playbackId;

  if (!playbackId) {
    throw new Error("Playback ID not found");
  }

  const playback = await livepeer.playback
    .get(playbackId)
    .then((res) => res.playbackInfo);
  PlaybackInfo;

  return NextResponse.json(playback);
}
