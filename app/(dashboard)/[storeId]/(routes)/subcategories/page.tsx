import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { SubcategoryColumn } from "./components/columns"
import { SubcategoriesClient } from "./components/client";

const SubcategoriesPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const subcategories = await prismadb.subcategory.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedSubcategories: SubcategoryColumn[] = subcategories.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 w-11/12 pt-6 pb-8 mx-auto">
        <SubcategoriesClient data={formattedSubcategories} />
      </div>
    </div>
  );
};

export default SubcategoriesPage;
