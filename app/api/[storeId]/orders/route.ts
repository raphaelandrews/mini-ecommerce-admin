import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function GET(
    req: Request,
    { params }: { params: string }
) {
    try {
        const orders = await prismadb.order.findMany({});

        return NextResponse.json(orders);
    } catch (error) {
        console.log('[ORDER_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};