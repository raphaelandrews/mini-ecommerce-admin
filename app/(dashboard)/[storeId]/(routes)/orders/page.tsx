import { format } from "date-fns";
import { clerkClient } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { OrderColumn } from "./components/columns"
import { OrderClient } from "./components/client";


const OrdersPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      orderItems: {
        include: {
          product: {
            include: {
              images: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedOrders: OrderColumn[] = await Promise.all(orders.map(async (item) => {
    const totalQuantity = item.orderItems.reduce((total, orderItem) => total + orderItem.quantity, 0);
    const totalPrice = item.orderItems.reduce((total, orderItem) => total + (orderItem.quantity * Number(orderItem.price)), 0);
    const orderItems = item.orderItems.map(orderItem => ({
      orderItem: orderItem,
      product: orderItem.product
    }));

    const user = await clerkClient.users.getUser(item.clientId);
    const { firstName, lastName } = user;
    const fullName = `${firstName} ${lastName}`;

    return {
      id: item.id,
      clientId: item.clientId,
      phone: item.phone,
      address: item.address,
      products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
      totalQuantity: totalQuantity.toString(),
      totalPrice: formatter.format(totalPrice),
      isPaid: item.isPaid,
      createdAt: format(item.createdAt, "MM/dd/yyyy"),
      fullName: fullName,
      orderItems: orderItems
    };
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 w-11/12 pt-6 pb-8 mx-auto">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;

