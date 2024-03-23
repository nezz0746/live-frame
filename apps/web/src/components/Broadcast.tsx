import { silkScreen } from "@lib/fonts";
import { EnableVideoIcon, StopIcon } from "@livepeer/react/assets";
import * as Broadcast from "@livepeer/react/broadcast";
import { getIngest } from "@livepeer/react/external";

const LivepeerBroadcast = ({ streamKey }: { streamKey: string }) => {
  return (
    <Broadcast.Root ingestUrl={getIngest(streamKey)}>
      <Broadcast.Container className="h-[500px] bg-gray-400 rounded-md">
        <Broadcast.Video title="Current livestream" className="h-full w-full" />

        <Broadcast.Controls className="flex items-end z-10 p-2 justify-end">
          <Broadcast.EnabledTrigger className="w-20 h-10 hover:scale-105 flex-shrink-0 border rounded-md bg-white">
            <Broadcast.EnabledIndicator asChild matcher={false}>
              <EnableVideoIcon className="w-full h-full text-red-500" />
            </Broadcast.EnabledIndicator>
            <Broadcast.EnabledIndicator asChild>
              <StopIcon className="w-full h-full text-red-500" />
            </Broadcast.EnabledIndicator>
          </Broadcast.EnabledTrigger>
        </Broadcast.Controls>

        <Broadcast.LoadingIndicator
          className={silkScreen.className}
          asChild
          matcher={false}
        >
          <div className="absolute overflow-hidden py-1 px-2 rounded-full top-1 left-1 bg-black/50 flex items-center backdrop-blur">
            <Broadcast.StatusIndicator
              matcher="live"
              className="flex gap-2 items-center"
            >
              <div className="bg-red-500 animate-pulse h-1.5 w-1.5 rounded-full" />
              <span className="text-xs select-none text-red-500">LIVE</span>
            </Broadcast.StatusIndicator>

            <Broadcast.StatusIndicator
              className="flex gap-2 items-center"
              matcher="pending"
            >
              <div className="bg-white/80 h-1.5 w-1.5 rounded-full animate-pulse" />
              <span className="text-xs select-none">LOADING</span>
            </Broadcast.StatusIndicator>

            <Broadcast.StatusIndicator
              className="flex gap-2 items-center"
              matcher="idle"
            >
              <div className="bg-white/80 h-1.5 w-1.5 rounded-full" />
              <span className="text-xs select-none">IDLE</span>
            </Broadcast.StatusIndicator>
          </div>
        </Broadcast.LoadingIndicator>
      </Broadcast.Container>
    </Broadcast.Root>
  );
};

export default LivepeerBroadcast;
