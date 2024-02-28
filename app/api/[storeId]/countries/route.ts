import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
 
export async function POST(
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

    const storeByUserId = await prismadb.storeUser.findFirst({
      where: {
        storeId: params.storeId,
        userId
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const country = await prismadb.country.create({
      data: {
        name,
        storeId: params.storeId
      }
    });
  
    return NextResponse.json(country);
  } catch (error) {
    console.log('[COUNTRIES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const country = await prismadb.country.findMany({
      where: {
        storeId: params.storeId
      }
    });
  
    return NextResponse.json(country);
  } catch (error) {
    console.log('[COUNTRIES_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
