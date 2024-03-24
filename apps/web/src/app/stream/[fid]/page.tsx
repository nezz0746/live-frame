import ColorfulText from "@components/ColorText";
import { DemoPlayer } from "@components/Player";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
import { baseURL } from "@lib/variables";
import { TvIcon } from "lucide-react";
import { neynar } from "src/app/api/neynar";
import { getFrameMetadata } from "@coinbase/onchainkit/frame";
import { fetchPlaybackPlaholder } from "./utils";

export const dynamic = "force-dynamic";

type StreamerPageProps = {
  params: { fid: string };
};

export async function generateMetadata({ params }: StreamerPageProps) {
  const brandUrl = "https://i.imgur.com/4HHBqUV.png";

  let image = brandUrl;
  let video;

  try {
    const playbck = await fetchPlaybackPlaholder(params.fid);
    image = playbck.image;
    video = playbck.video;
  } catch (error) {
    console.error("Failed to fetch playback placeholder", error);
  }

  return {
    title: "Streamer Page",
    "og:image": brandUrl,
    other: {
      ...getFrameMetadata({
        state: {
          fid: parseInt(params.fid),
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
            target: baseURL + "/stream/" + params.fid,
          },
        ],
        image,
        postUrl: baseURL + "/api/frame",
      }),
      ...(video && {
        "fc:frame:video": video,
        "fc:frame:video:type": "video/hls",
      }),
    },
  };
}

const PageWithStreamPlayer = async ({ params: { fid } }: StreamerPageProps) => {
  const playback = await fetch(baseURL + "/api/stream/playback/" + fid).then(
    (res) => res.json()
  );
  const farcasterUser = await neynar
    .fetchBulkUsers([parseInt(fid)])
    .then((res) => res.users[0]);

  return (
    <>
      <div className="gap-2 flex flex-col">
        {farcasterUser && (
          <Alert>
            <TvIcon className="h-4 w-4" />
            <AlertTitle>Thank for tuning in!</AlertTitle>
            <AlertDescription>
              You're currently watching{" "}
              <ColorfulText element="span" text={farcasterUser.display_name} />
              's stream.
            </AlertDescription>
          </Alert>
        )}
        {playback && <DemoPlayer playback={playback} />}
      </div>
    </>
  );
};

export default PageWithStreamPlayer;
