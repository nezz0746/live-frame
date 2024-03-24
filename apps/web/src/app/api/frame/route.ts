import {
  FrameRequest,
  getFrameHtmlResponse,
  getFrameMessage,
} from "@coinbase/onchainkit/frame";
import { baseURL } from "@lib/variables";
import { NextRequest, NextResponse } from "next/server";
import { fetchPlaybackPlaholder } from "src/app/stream/[fid]/utils";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const frameRequest: FrameRequest = await req.json();

  const { isValid, message } = await getFrameMessage(frameRequest, {
    neynarApiKey: process.env.NEYNAR_API_KEY,
    allowFramegear: true,
  });

  const { fid } = JSON.parse(message?.state?.serialized ?? "{}");

  const brandUrl = "https://i.imgur.com/4HHBqUV.png";
  let image = brandUrl;
  let video;

  if (fid) {
    try {
      // Fetching livepeer assets: Livestream link & Thumbnail for fallback
      const playbck = await fetchPlaybackPlaholder(fid);
      image = playbck.image;
      video = playbck.video;
    } catch (error) {
      console.error("Failed to fetch playback placeholder", error);
    }
  }

  const res = getFrameHtmlResponse({
    state: {
      fid,
    },
    buttons: [
      {
        label: "Yoink !",
        action: "post",
        target: baseURL + "/api/frame",
      },
      {
        label: "Link",
        action: "link",
        target: baseURL + "/stream/" + fid,
      },
    ],

    image,
    postUrl: baseURL + "/api/frame",
    video: video
      ? {
          src: video,
          type: "video/hls",
        }
      : undefined,
  });

  console.log(res);

  return new NextResponse(res);
}
export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
