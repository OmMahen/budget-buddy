'use client'
import { UserContext } from "@/utils/userContext";
import { useContext } from "react";

export function Hero() {
  const [user, setUser] = useContext(UserContext);

  return (
    <section className="text-center w-full p-24 dark:bg-gray-800">
      {user ? (
        <h1 className="text-5xl font-bold text-green-600">
          Hallo {user.email} !
        </h1>
      ) : (
        <h1 className="text-5xl font-bold text-green-600">
          Explore Lombok with Travel Yuks
        </h1>
      )}
      <p className="mt-4">
        Travel Yuks Terdepan Dalam Melayani Anda
      </p>
    </section>
  );
}
