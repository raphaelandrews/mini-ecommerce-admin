import { redirect } from "next/navigation";
import { UserButton, auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

import StoreSwitcher from "@/components/store-switcher";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    }
  });

  return (
    <div className="flex items-center w-11/12 h-16 md:h-20 mx-auto">
      <StoreSwitcher items={stores} />
      <MainNav className="mx-6" />
      <div className="ml-auto flex items-center space-x-4">
        <ThemeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              userButtonAvatarBox:
                "w-10 h-10",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;