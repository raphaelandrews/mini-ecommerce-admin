"use client";

import { Row } from "@tanstack/react-table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";

import { columns, OrderColumn } from "./columns";
import Currency from "@/components/currency";

interface OrderClientProps {
  data: OrderColumn[];
}

export const OrderClient: React.FC<OrderClientProps> = ({
  data
}) => {
  const renderSubComponent = ({ row }: { row: Row<OrderColumn> }) => {
    return (
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-0 p-4 border-b">
        {row.original.orderItems.map((items) => (
          <div
            key={items.product.id}
            className="flex items-center gap-4"
          >
            <Avatar
              className="w-20 h-20"
            >
              <AvatarImage src={items.product.images?.[0]?.url} />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
            <div>
              <p>{items.product.name}</p>
              <p>x {items.orderItem.quantity}</p>
              <Currency value={items.orderItem.price} />
            </div>
          </div>
        ))}
      </div>
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
