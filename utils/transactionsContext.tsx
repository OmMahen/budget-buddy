"use client";
import { createContext, useState, useEffect, useContext } from "react";
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
  const [balance, setBalance] = useState(0);

  const fetchTransactions = async () => {
    if (user) {
      Promise.all([
        fetch("/api/transactions").then((res) => res.json()),
        fetch("/api/balances").then((result) => result.json()),
      ])
        .then(([transactionsData, balancesData]) => {
          setTransactions(transactionsData?.transactions?.reverse());
          setBalance(balancesData?.data[0]?.balance);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
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
    <TransactionsContext.Provider
      value={{ transactions, setTransactions, balance, setBalance }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
