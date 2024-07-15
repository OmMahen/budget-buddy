import { Table } from "flowbite-react";

export default function TransactionsTableSkeleton({ limit }: any) {
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
          {[...Array(limit)].map((_, index) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800 animate-pulse"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
              </Table.Cell>
              <Table.Cell>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
              </Table.Cell>
              <Table.Cell>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              </Table.Cell>
              <Table.Cell>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
