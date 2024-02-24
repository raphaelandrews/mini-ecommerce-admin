import prismadb from "@/lib/prismadb";

import { CountryForm } from "./components/country-form";

const CountryPage = async ({
  params
}: {
  params: { countryId: string }
}) => {
  const country = await prismadb.country.findUnique({
    where: {
      id: params.countryId
    }
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 w-11/12 pt-6 pb-8 mx-auto">
        <CountryForm initialData={country} />
      </div>
    </div>
  );
}

export default CountryPage;
