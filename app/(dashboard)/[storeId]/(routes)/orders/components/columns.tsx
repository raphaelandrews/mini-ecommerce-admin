"use client"

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalQuantity: string;
  totalPrice: string;
  products: string;
  createdAt: string;
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
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
