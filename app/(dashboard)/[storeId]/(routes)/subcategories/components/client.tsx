"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { ApiList } from "@/components/ui/api-list";

import { columns, SubcategoryColumn } from "./columns";

interface SubcategoriesClientProps {
  data: SubcategoryColumn[];
}

export const SubcategoriesClient: React.FC<SubcategoriesClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Subcategories (${data.length})`} description="Manage subcategories for your products" />
        <Button onClick={() => router.push(`/${params.storeId}/subcategories/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Subcategories" />
      <ApiList entityName="subcategories" entityIdName="subcategoryId" />
    </>
  );
};
