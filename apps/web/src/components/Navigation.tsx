"use client";

import { usePrivy } from "@privy-io/react-auth";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ColorfulText from "./ColorText";

const Navigation = () => {
  const { ready, user, authenticated, logout } = usePrivy();

  const showMenu = ready && authenticated && Boolean(user);

  return (
    <nav className="w-full flex flex-row justify-between">
      <ColorfulText
        text="AlwaysOn"
        className="font-black text-4xl tracking-tighter"
      />
      {showMenu && (
        <div className=" flex flex-row gap-2">
          <Button variant="outline" className="gap-2">
            <Avatar className="w-6 h-6">
              {user?.farcaster?.pfp && (
                <AvatarImage src={user?.farcaster?.pfp} alt="farcaster pfp" />
              )}
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{user?.farcaster?.displayName}</p>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
                <LogOutIcon className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    logout();
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
