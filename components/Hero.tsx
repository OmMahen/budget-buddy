'use client'
import { UserContext } from "@/utils/userContext";
import { useContext } from "react";

export function Hero() {
  const [user, setUser] = useContext(UserContext);

  const getEmailName = (email: any) => {
    return email.split('@')[0];
  };

  return (
    <section className="text-center w-full py-24 px-4 dark:bg-gray-800">
      {user ? (
        <h1 className="text-3xl md:text-5xl font-bold text-green-600">
          Hallo {getEmailName(user.email)}!
        </h1>
      ) : (
        <h1 className="text-3xl md:text-5xl font-bold text-green-600">
          Explore Lombok with Travel Yuks
        </h1>
      )}
      <p className="mt-4">
        Travel Yuks Terdepan Dalam Melayani Anda
      </p>
    </section>
  );
}
