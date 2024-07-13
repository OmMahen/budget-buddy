import { Table, Badge } from "flowbite-react";
import { formatToIDR } from "@/utils/lib";

export default function TransactionsTable({ transactions }: any) {
  return (
    <div className="overflow-x-auto max-w-screen-lg mx-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Time</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Amount</Table.HeadCell>
          <Table.HeadCell>Type</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {transactions?.map((transaction: any, index: any) => (
            <Table.Row
              key={`${index}-${transaction.transaction_id}`}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {new Date(transaction.date).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {new Date(transaction.date).toLocaleTimeString()}
              </Table.Cell>
              <Table.Cell>{transaction.description}</Table.Cell>
              <Table.Cell>
                {formatToIDR(transaction.amount.toFixed(2))}
              </Table.Cell>
              <Table.Cell>
                {transaction.categories.type === "income" ? (
                  <Badge color="success" className="inline">
                    Income
                  </Badge>
                ) : (
                  <Badge color="failure" className="inline">
                    Expense
                  </Badge>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
