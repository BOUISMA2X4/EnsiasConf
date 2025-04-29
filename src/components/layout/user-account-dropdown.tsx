"use client";

import { signOut } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import UserAvatarLabelGroup from "../user-avatar-label-group";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

interface User {
  name: string;
  email: string;
  image: string;
}

interface DropdownProps {
  user: User;
}

export default function UserAccountDropdown({ user }: DropdownProps) {
  const { toast } = useToast();

  const handleSignOut = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    try {
      await signOut({ callbackUrl: `${window.location.origin}/` });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error signing out",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-0 py-0 md:px-3 md:py-2 rounded-full hover:bg-muted transition-colors"
        >
          <UserAvatarLabelGroup user={user} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-60 mt-2 rounded-xl border bg-background shadow-lg animate-fadeIn">
        <DropdownMenuLabel className="text-muted-foreground">
          Signed in as
          <div className="font-medium truncate">{user.email}</div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem disabled className="flex items-center gap-2 opacity-60">
            <Icons.avatar width={16} height={16} />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem disabled className="flex items-center gap-2 opacity-60">
            <Icons.settings width={16} height={16} />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="flex items-center gap-2 text-destructive focus:text-destructive hover:bg-destructive/10 cursor-pointer transition-all"
        >
          <Icons.logout width={16} height={16} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
