"use client";
import TransactionsTable from "@/components/TransactionsTable";
import { Pagination, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";

export default function Transactions() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const onPageChange = (page: number) => setCurrentPage(page);

  const fetchTransactions = async () => {
    setLoading(true);
    fetch(`/api/transactions?page=${currentPage}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data?.transactions);
        setTotal(Math.ceil(data?.total / limit));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage]);

  return (
    <div className="w-full p-4">
      {isLoading ? (
        <div className="p-4 flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <TransactionsTable transactions={transactions} />
      )}
      <div className="flex justify-center items-center">
        <Pagination
          currentPage={currentPage}
          totalPages={total}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </div>
  );
}
