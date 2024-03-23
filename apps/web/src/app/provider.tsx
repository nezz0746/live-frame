"use client";

import ColorfulText from "@components/ColorText";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { PrivyProvider, useLogin, usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import {
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? ""}
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
          logo: "https://i.imgur.com/4HHBqUV.png",
        },
        loginMethods: ["farcaster"],
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <SignIn>{children}</SignIn>
      </QueryClientProvider>
    </PrivyProvider>
  );
};

const SignIn = ({ children }: { children: React.ReactNode }) => {
  const { ready, authenticated } = usePrivy();
  const { mutate: createUser } = useMutation({
    mutationKey: ["createUser"],
    mutationFn: async (fid: string) =>
      fetch("/api/user/create", {
        method: "POST",
        body: JSON.stringify({ fid }),
      }),
  });
  const { login } = useLogin({
    onComplete: (user, isNewUser) => {
      if (isNewUser) {
        if (user?.farcaster?.fid) createUser(user?.farcaster?.fid.toString());
      }
    },
  });

  if (!ready) {
    // Do nothing while the PrivyProvider initializes with updated user state
    return <></>;
  }

  if (ready && !authenticated) {
    // Replace this code with however you'd like to handle an unauthenticated user
    // As an example, you might redirect them to a login page
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <Card>
          <CardHeader>
            <CardTitle>
              <ColorfulText text="AlwaysOn" className="text-6xl" />
            </CardTitle>
            <CardDescription className="text-center">
              Open your window to the entire world
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-[400px] h-[400px]">
              <Image
                src="/fun.jpg"
                width={500}
                height={500}
                alt="streamers grid image"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={login} className="w-full">
              Sign In
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (ready && authenticated) {
    // Replace this code with however you'd like to handle an authenticated user
    return <>{children}</>;
  }
};

export default Providers;
