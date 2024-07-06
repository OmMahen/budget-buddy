"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const UserContext = createContext<any>([null, () => {}]);

export const useUserContext = () => {
  return useContext(UserContext);
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();
  const pathname = usePathname();

  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  };

  useEffect(() => {
    fetchUser();
  }, [pathname]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
