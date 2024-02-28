import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function GET(
    req: Request,
    { params }: { params: string }
) {
    try {
        const orderItems = await prismadb.orderItem.findMany({});

        return NextResponse.json(orderItems);
    } catch (error) {
        console.log('[ORDERITEMS_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};