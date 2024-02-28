import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

import { SettingsForm } from "./components/settings-form";

const SettingsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const storeUser = await prismadb.storeUser.findFirst({
    where: {
      storeId: params.storeId,
      userId
    },
    include: {
      store: true
    }
  });

  if (!storeUser) {
    redirect('/');
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 w-11/12 pt-6 pb-8 mx-auto">
        <SettingsForm initialData={storeUser.store} />
      </div>
    </div>
  );
}

export default SettingsPage;
