"use client";
import React, { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Card } from "flowbite-react";
import { useTransactionsContext } from "@/utils/transactionsContext";

const countBalance = (transactions: Array<any>) => {
  let balance = 0;
  transactions?.forEach((transaction: any) => {
    if (transaction.categories.type === "income") {
      balance += transaction.amount;
    } else {
      balance -= transaction.amount;
    }
  });
  return balance;
};

const BalanceDisplay = () => {
  const [showBalance, setShowBalance] = useState(false);
  const { transactions } = useTransactionsContext();
  const balance = countBalance(transactions);

  const toggleBalanceVisibility = () => {
    setShowBalance((prev) => !prev);
  };

  const formatToIDR = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const hideBalance = (balance: number) => {
    const formattedBalance = formatToIDR(balance);
    const hiddenBalance = formattedBalance.replace(/[0-9]/g, "X");
    return hiddenBalance;
  };

  return (
    <div className="w-full mb-4">
      <Card className="w-full md:items-center">
        <div>
          <p className="mb-2">Saldo Anda</p>
          <div>
            <span className={`text-2xl md:text-4xl font-bold`}>
              {showBalance ? formatToIDR(balance) : hideBalance(balance)}
            </span>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-800 focus:outline-none ml-4"
              onClick={toggleBalanceVisibility}
            >
              {showBalance ? (
                <FaEyeSlash className="md:text-2xl" />
              ) : (
                <FaEye className="md:text-2xl" />
              )}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BalanceDisplay;
