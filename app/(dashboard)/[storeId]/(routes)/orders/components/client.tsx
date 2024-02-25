"use client";

import { Row } from "@tanstack/react-table";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";

import { columns, OrderColumn } from "./columns";

interface OrderClientProps {
  data: OrderColumn[];
}

export const OrderClient: React.FC<OrderClientProps> = ({
  data
}) => {
  const renderSubComponent = ({ row }: { row: Row<OrderColumn> }) => {
    return (
      <>
        {row.original.orderItems.map((items) => (
          <div key={items.product.id}>
            {items.product.name}
          </div>
        ))}
      </>
    )
  }

  return (
    <>
      <Heading title={`Orders (${data.length})`} description="Manage orders for your store" />
      <DataTable
        searchKey="products"
        columns={columns}
        data={data}
        getRowCanExpand={() => true}
        renderSubComponent={renderSubComponent}
      />
    </>
  );
};
