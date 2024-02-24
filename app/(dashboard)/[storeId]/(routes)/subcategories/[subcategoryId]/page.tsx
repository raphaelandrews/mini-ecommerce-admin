import prismadb from "@/lib/prismadb";

import { SubcategoryForm } from "./components/subcategory-form";

const SubcategoryPage = async ({
  params
}: {
  params: { subcategoryId: string, storeId: string }
}) => {
  const subcategory = await prismadb.subcategory.findUnique({
    where: {
      id: params.subcategoryId
    }
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 w-11/12 pt-6 pb-8 mx-auto">
        <SubcategoryForm 
        initialData={subcategory}
        categories={categories} 
        />
      </div>
    </div>
  );
}

export default SubcategoryPage;
