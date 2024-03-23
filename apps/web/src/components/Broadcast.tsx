import { silkScreen } from "@lib/fonts";
import * as Broadcast from "@livepeer/react/broadcast";
import { getIngest } from "@livepeer/react/external";
import { Button } from "./ui/button";

const LivepeerBroadcast = ({ streamKey }: { streamKey: string }) => {
  return (
    <Broadcast.Root ingestUrl={getIngest(streamKey)}>
      <Broadcast.Container className="bg-gray-400 bg-opacity-20 rounded-md h-full">
        <Broadcast.Video title="Current livestream" className="h-full m-auto" />

        <Broadcast.Controls className="flex items-end z-10 p-2 justify-end">
          <Broadcast.EnabledTrigger className="w-20 h-10 hover:scale-105 flex-shrink-0 border rounded-md bg-white">
            <Broadcast.EnabledIndicator asChild matcher={false}>
              <Button className={silkScreen.className} variant={"outline"}>
                Play
              </Button>
            </Broadcast.EnabledIndicator>
            <Broadcast.EnabledIndicator asChild>
              <Button className={silkScreen.className} variant={"outline"}>
                Stop
              </Button>
            </Broadcast.EnabledIndicator>
          </Broadcast.EnabledTrigger>
        </Broadcast.Controls>

        <Broadcast.LoadingIndicator
          className={silkScreen.className}
          asChild
          matcher={false}
        >
          <div className="absolute overflow-hidden py-1 px-2 rounded-md top-2 left-2 bg-green-200 flex items-center">
            <Broadcast.StatusIndicator
              matcher="live"
              className="flex gap-2 items-center"
            >
              <div className="bg-red-500 animate-pulse h-1.5 w-1.5 rounded-md" />
              <span className="text-xs select-none text-red-500">LIVE</span>
            </Broadcast.StatusIndicator>

            <Broadcast.StatusIndicator
              className="flex gap-2 items-center"
              matcher="pending"
            >
              <div className="bg-white/80 h-1.5 w-1.5 rounded-md animate-pulse" />
              <span className="text-xs select-none">LOADING</span>
            </Broadcast.StatusIndicator>

            <Broadcast.StatusIndicator
              className="flex gap-2 items-center"
              matcher="idle"
            >
              <div className="bg-white/80 h-1.5 w-1.5 rounded-md" />
              <span className="text-xs select-none">IDLE</span>
            </Broadcast.StatusIndicator>
          </div>
        </Broadcast.LoadingIndicator>
      </Broadcast.Container>
    </Broadcast.Root>
  );
};

export default LivepeerBroadcast;
