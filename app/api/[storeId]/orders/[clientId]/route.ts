import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { clientId: string } }
) {
  
  try {
    if (!params.clientId) {
      return new NextResponse("Client id is required", { status: 400 });
    }

    const order = await prismadb.order.findMany({
      where: {
        clientId: params.clientId
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

    return NextResponse.json(order);
  } catch (error) {
    console.log('[ORDER_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
