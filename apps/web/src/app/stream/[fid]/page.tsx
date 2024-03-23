import ColorfulText from "@components/ColorText";
import { DemoPlayer } from "@components/Player";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
import { baseURL } from "@lib/variables";
import { TvIcon } from "lucide-react";
import { neynar } from "src/app/api/neynar";

type StreamerPageProps = {
  params: { fid: string };
};

const PageWithStreamPlayer = async ({ params: { fid } }: StreamerPageProps) => {
  const playback = await fetch(baseURL + "/api/stream/playback/" + fid).then(
    (res) => res.json()
  );
  const farcasterUser = await neynar
    .fetchBulkUsers([parseInt(fid)])
    .then((res) => res.users[0]);

  return (
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
  );
};

export default PageWithStreamPlayer;
