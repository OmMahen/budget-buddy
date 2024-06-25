import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Card } from "flowbite-react";

export async function PopularTourPackages() {
  const supabase = createClient();
  const { data: packages, error } = await supabase.from("packages").select();
  if (error) {
    console.error("Error fetching packages:", error);
    return (
      <section className="py-20 bg-gray-100 px-7">
        <h2 className="text-3xl font-bold text-center mb-8">
          Popular Tour Packages
        </h2>
        <p className="text-center text-red-500">
          Failed to load tour packages. Please try again later.
        </p>
      </section>
    );
  }

  if (!packages) {
    return (
      <section className="py-20 bg-gray-100 px-7">
        <h2 className="text-3xl font-bold text-center mb-8">
          Popular Tour Packages
        </h2>
        <p className="text-center">No tour packages available at the moment.</p>
      </section>
    );
  }
  
  return (
    <section className="py-20 bg-gray-100 dark:bg-black px-7">
      <h2 className="text-3xl font-bold text-center mb-8">
        Popular Tour Packages
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((item, index) => (
          <Card key={index}>
            <h3 className="text-xl font-bold mb-4">{item.name}</h3>
            <p className="mb-4">{item.description}</p>
            <Link
              href={`/packages/${item.id}`}
              className="text-green-600 hover:text-green-800"
            >
              Readmore &rarr;
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
