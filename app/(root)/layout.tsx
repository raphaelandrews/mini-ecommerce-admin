import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.storeUser.findFirst({
    where: {
      userId,
    },
    include: {
      store: true
    }
  });

  if (store) {
    redirect(`/${store.store.id}`);
  };

  return (
    <>
      {children}
    </>
  );
};
