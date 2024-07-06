"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { createClient } from "@/utils/supabase/client";
import { Spinner } from "flowbite-react";
import { useUserContext } from "./userContext";

const TransactionsContext = createContext<any>([null, () => {}]);

export const useTransactionsContext = () => {
  return useContext(TransactionsContext);
};

export function TransactionsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUserContext();
  const [transactions, setTransactions] = useState<any>(null);
  const supabase = createClient();

  const fetchTransactions = async () => {
    if (user) {
      const { data } = await supabase
        .from("transactions")
        .select("transaction_id, date, amount, description, categories(type)")
        .eq("user_id", user?.id)
        .order("date", { ascending: false })
        .limit(5);
      setTransactions(data?.reverse());
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  if (!transactions) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <TransactionsContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
