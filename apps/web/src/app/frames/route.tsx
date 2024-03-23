import { baseURL } from "@lib/variables";
import { createFrames, Button } from "frames.js/next";
import { NextRequest, NextResponse } from "next/server";
import { fetchPlaybackPlaholder } from "./utils";

const brandUrl = "https://i.imgur.com/4HHBqUV.png";

const frames = createFrames();
export const handleRequest = frames(async (ctx) => {
  const { fid } = ctx.searchParams;

  let placeholderUrl = brandUrl;

  try {
    placeholderUrl = await fetchPlaybackPlaholder(fid);
  } catch (error) {
    console.error("Failed to fetch playback placeholder", error);
  }

  return {
    image:
      placeholderUrl !== brandUrl ? (
        placeholderUrl
      ) : (
        <div tw="flex flex-col justify-center items-center">
          <img src={placeholderUrl} />
          <p>FID: {fid}'s stream</p>
        </div>
      ),
    buttons: [
      <Button action="link" target={baseURL + "/stream/" + fid}>
        Link
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
