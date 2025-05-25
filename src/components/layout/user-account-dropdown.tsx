"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

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

  const handleSettings = () => {
    router.push("/settings"); // Change "/settings" to your actual route
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
          <DropdownMenuItem
            onClick={() => router.push("/profile")} // Optionnel, pour profil
            className="flex items-center gap-2 cursor-pointer"
          >
            <Icons.avatar width={16} height={16} />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleSettings}
            className="flex items-center gap-2 cursor-pointer"
          >
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
