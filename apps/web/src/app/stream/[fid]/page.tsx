"use client";

import ColorfulText from "@components/ColorText";
import { DemoPlayer } from "@components/Player";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
import { usePrivy } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";
import { TvIcon } from "lucide-react";

const PageWithStreamPlayer = () => {
  const { user } = usePrivy();

  const { data } = useQuery({
    queryKey: ["playback"],
    queryFn: () =>
      fetch("/api/stream/playback/" + user?.farcaster?.fid).then((res) =>
        res.json()
      ),
  });

  return (
    <div className="gap-2 flex flex-col">
      {user?.farcaster?.displayName && (
        <Alert>
          <TvIcon className="h-4 w-4" />
          <AlertTitle>Thank for tuning in!</AlertTitle>
          <AlertDescription>
            You're currently watching{" "}
            <ColorfulText element="span" text={user?.farcaster?.displayName} />
            's stream.
          </AlertDescription>
        </Alert>
      )}
      {data && <DemoPlayer playback={data} />}
    </div>
  );
};

export default PageWithStreamPlayer;
