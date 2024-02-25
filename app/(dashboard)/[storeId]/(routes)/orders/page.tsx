import { format } from "date-fns";

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
          product: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => {
    const totalQuantity = item.orderItems.reduce((total, orderItem) => total + orderItem.quantity, 0);
    const totalPrice = item.orderItems.reduce((total, orderItem) => total + (orderItem.quantity * Number(orderItem.product.price)), 0);
  
    return {
      id: item.id,
      phone: item.phone,
      address: item.address,
      products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
      totalQuantity: totalQuantity.toString(), 
      totalPrice: formatter.format(totalPrice),
      isPaid: item.isPaid,
      createdAt: format(item.createdAt, 'MMMM do, yyyy'),
      orderItems: item.orderItems
    };
  });
  

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 w-11/12 pt-6 pb-8 mx-auto">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
