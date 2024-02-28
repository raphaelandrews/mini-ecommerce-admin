"use client"

import { ColumnDef } from "@tanstack/react-table";
import { OrderItem, Image, Product as PrismaProduct } from "@prisma/client";

import { Badge } from "@/components/ui/badge";

interface Product extends PrismaProduct {
  images: Image[];
}

export type OrderColumn = {
  id: string;
  clientId: string
  phone: string;
  address: string;
  isPaid: boolean;
  totalQuantity: string;
  totalPrice: string;
  products: string;
  createdAt: string;
  orderItems: { orderItem: OrderItem; product: Product }[];
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    id: 'expander',
    header: () => null,
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <button
          {...{
            onClick: row.getToggleExpandedHandler(),
            style: { cursor: 'pointer' },
          }}
        >
          {row.getIsExpanded() ? '👇' : '👉'}
        </button>
      ) : (
        '🔵'
      )
    },
  },
  {
    accessorKey: "orderItem.clientId",
    header: "User ID",
    cell: ({ row }) => (
      <p key={row.original.clientId}>
        {row.original.clientId}
      </p>
    )
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "totalQuantity",
    header: "Total quantity",
  },
  {
    accessorKey: "totalPrice",
    header: "Total price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
    cell: ({ row }) => (
      <>
        {row.original.isPaid ? (
          <Badge
            variant="outline"
            className="text-success bg-success-foreground border-success-border">
            Paid
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="text-danger bg-danger-foreground border-danger-border">
            Unpaid
          </Badge>
        )}
      </>
    )
  },
];
