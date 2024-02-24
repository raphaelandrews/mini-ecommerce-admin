import prismadb from "@/lib/prismadb";

import { ProductForm } from "./components/product-form";

const ProductPage = async ({
  params
}: {
  params: { productId: string, storeId: string }
}) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    }
  });

  const subcategories = await prismadb.subcategory.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const countries = await prismadb.country.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 w-11/12 pt-6 pb-8 mx-auto">
        <ProductForm 
          subcategories={subcategories}
          countries={countries}
          initialData={product}
        />
      </div>
    </div>
  );
}

export default ProductPage;
