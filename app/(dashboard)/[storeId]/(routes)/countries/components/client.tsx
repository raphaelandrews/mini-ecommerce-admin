"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { ApiList } from "@/components/ui/api-list";

import { columns, CountryColumn } from "./columns";

interface CountryClientProps {
  data: CountryColumn[];
}

export const CountryClient: React.FC<CountryClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Countries (${data.length})`} description="Manage countries for your products" />
        <Button onClick={() => router.push(`/${params.storeId}/countries/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Countries" />
      <ApiList entityName="countries" entityIdName="countryId" />
    </>
  );
};
