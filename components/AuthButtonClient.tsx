"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";
import { UserContext } from "@/utils/userContext";
import { useContext } from "react";

export default function AuthButton() {
  const [user, setUser] = useContext(UserContext);
  const router = useRouter();

  const signIn = () => {
    router.push("/login");
  };

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  return user ? (
    <Button className="ml-4 bg-green-600" onClick={signOut}>
      Logout
    </Button>
  ) : (
    <Button className="ml-4 bg-green-600" onClick={signIn}>
      Login
    </Button>
  );
}
