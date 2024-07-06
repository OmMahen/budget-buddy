"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";
import { useContext } from "react";
import { useUserContext } from "@/utils/userContext";

export default function AuthButton() {
  const { user } = useUserContext();
  const router = useRouter();

  const signIn = () => {
    router.push("/login");
  };

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    location.reload();
  };

  return user ? (
    <Button className="bg-green-600 dark:bg-green-600" onClick={signOut}>
      Logout
    </Button>
  ) : (
    <Button className="bg-green-600 dark:bg-green-600" onClick={signIn}>
      Login
    </Button>
  );
}
