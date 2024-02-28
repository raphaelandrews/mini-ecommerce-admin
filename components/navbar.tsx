import { redirect } from "next/navigation";
import { UserButton, auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

import CommandMenu from "@/components/command-menu";
import StoreSwitcher from "@/components/store-switcher";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const stores = await prismadb.storeUser.findMany({
    where: {
      userId: userId
    },
    include: {
      store: true
    }
  });

  return (
    <header className="flex items-center w-11/12 h-16 md:h-20 mx-auto">
      <StoreSwitcher items={stores} />
      <MainNav className="mx-6 hidden xl:block" />
      <div className="ml-auto flex items-center space-x-4">
        <ThemeToggle />

        <CommandMenu />

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
    </header>
  );
};

export default Navbar;