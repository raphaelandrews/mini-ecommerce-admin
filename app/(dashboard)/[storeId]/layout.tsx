import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import Navbar from '@/components/navbar'
import prismadb from '@/lib/prismadb';

export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { storeId: string }
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const storeUser = await prismadb.storeUser.findFirst({
    where: {
      storeId: params.storeId,
      userId,
    },
    include: {
      store: true
    }
  });

  if (!storeUser?.store) {
    redirect('/');
  };

  return (
    <div className='max-w-[1280px] mx-auto'>
      <Navbar />
      <main className='min-h-screen'>
        {children}
      </main>
    </div>
  );
};
