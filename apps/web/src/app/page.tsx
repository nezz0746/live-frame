"use client";

import LivepeerBroadcast from "@components/Broadcast";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { User } from "@lib/types";
import { usePrivy } from "@privy-io/react-auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

export default function Page(): JSX.Element {
  const { user } = usePrivy();
  const { data, isLoading, refetch } = useQuery<
    undefined,
    unknown,
    User | null,
    string[]
  >({
    queryKey: ["user"],
    queryFn: () =>
      fetch("api/user/" + user?.farcaster?.fid).then((res) => res.json()),
    enabled: !!user?.farcaster?.fid,
  });

  const { mutate: createStream, isPending } = useMutation({
    mutationKey: ["stream"],
    mutationFn: (userId: string) =>
      fetch("api/stream/create", {
        method: "POST",
        body: JSON.stringify({ userId }),
      }).then((res) => res.json()),
    onSettled: () => refetch(),
  });

  const createNewStream = () => {
    if (!data) return;

    createStream(data?.id);
  };

  console.log(data);

  return (
    <main className="h-[80%]">
      <Card className="h-full bg-gradient-to-br from-white to-green-50 shadow-md">
        <CardContent className="flex flex-row h-full">
          <div className="p-4 w-1/5">
            <p className="text-2xl font-semibold">Studio</p>
          </div>
          <div className="w-full h-full border">
            {isLoading ? (
              <div className="flex flex-col h-full justify-center items-center">
                <Loader size={16} className="fill-gray-400 animate-spin" />
              </div>
            ) : data?.stream ? (
              <div className="h-full p-4 m-auto">
                <LivepeerBroadcast streamKey={data?.stream?.key} />
              </div>
            ) : (
              <div className="p-4 w-full h-full">
                <div className="border-gray-400 p-4 rounded-md justify-center items-center h-full flex flex-col gap-8 border-dotted border-2">
                  You have no stream running yet.
                  <Button disabled={isPending} onClick={createNewStream}>
                    Create new stream
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
