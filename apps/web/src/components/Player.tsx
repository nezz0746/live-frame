import * as Player from "@livepeer/react/player";
import { getSrc } from "@livepeer/react/external";
import { PauseIcon, PlayIcon } from "lucide-react";
import { PlaybackInfo } from "livepeer/dist/models/components";

export const DemoPlayer = ({ playback }: { playback: PlaybackInfo }) => {
  return (
    <Player.Root src={getSrc(playback)}>
      <Player.Container className="border h-[80%] rounded-md">
        <Player.Video title="Live stream" className="w-full h-full" />

        <Player.Controls className="flex items-center justify-center">
          <Player.PlayPauseTrigger className="w-10 h-10">
            <Player.PlayingIndicator asChild matcher={false}>
              <PlayIcon />
            </Player.PlayingIndicator>
            <Player.PlayingIndicator asChild>
              <PauseIcon />
            </Player.PlayingIndicator>
          </Player.PlayPauseTrigger>
        </Player.Controls>
      </Player.Container>
    </Player.Root>
  );
};
