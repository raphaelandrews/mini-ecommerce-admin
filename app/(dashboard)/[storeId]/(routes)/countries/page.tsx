import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { CountryColumn } from "./components/columns"
import { CountryClient } from "./components/client";

const CountriesPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const countries = await prismadb.country.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedCountries: CountryColumn[] = countries.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 w-11/12 pt-6 pb-8 mx-auto">
        <CountryClient data={formattedCountries} />
      </div>
    </div>
  );
};

export default CountriesPage;
