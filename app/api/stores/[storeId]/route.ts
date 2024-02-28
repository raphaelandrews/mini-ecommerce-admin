import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeUser = await prismadb.storeUser.findFirst({
      where: {
        storeId: params.storeId,
        userId
      }
    });

    if (!storeUser) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const store = await prismadb.store.update({
      where: { id: params.storeId },
      data: { name }
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeUser = await prismadb.storeUser.findFirst({
      where: {
        storeId: params.storeId,
        userId
      }
    });

    if (!storeUser) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Delete the store based on the storeId
    const deletedStore = await prismadb.store.delete({
      where: { id: params.storeId }
    });

    return NextResponse.json(deletedStore);
  } catch (error) {
    console.log('[STORE_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
