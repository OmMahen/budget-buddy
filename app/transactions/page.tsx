"use client";
import TransactionsTable from "@/components/TransactionsTable";
import TransactionsTableSkeleton from "@/components/TransactionsTableSkeleton";
import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";

export default function Transactions() {
  const limit = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(limit);

  const onPageChange = (page: number) => setCurrentPage(page);

  const fetchTransactions = async () => {
    setLoading(true);
    fetch(`/api/transactions?page=${currentPage}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data?.transactions);
        setTotal(data?.total);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage]);

  const remainingItems = total - (currentPage - 1) * limit;
  const skeletonCount = remainingItems < limit ? remainingItems : limit;

  return (
    <div className="w-full p-4">
      {isLoading ? (
        <TransactionsTableSkeleton limit={skeletonCount} />
      ) : (
        <TransactionsTable transactions={transactions} />
      )}
      <div className="flex justify-center items-center">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(total / limit)}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </div>
  );
}
