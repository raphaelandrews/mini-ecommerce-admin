import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { countryId: string } }
) {
  try {
    if (!params.countryId) {
      return new NextResponse("Country id is required", { status: 400 });
    }

    const country = await prismadb.country.findUnique({
      where: {
        id: params.countryId
      }
    });
  
    return NextResponse.json(country);
  } catch (error) {
    console.log('[COUNTRY_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { countryId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.countryId) {
      return new NextResponse("Country id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const country = await prismadb.country.delete({
      where: {
        id: params.countryId
      }
    });
  
    return NextResponse.json(country);
  } catch (error) {
    console.log('[COUNTRY_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { countryId: string, storeId: string } }
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

    if (!params.countryId) {
      return new NextResponse("Country id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const country = await prismadb.country.update({
      where: {
        id: params.countryId
      },
      data: {
        name,
      }
    });
  
    return NextResponse.json(country);
  } catch (error) {
    console.log('[COUNTRY_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
