'use client'
import React, { useEffect, useState } from 'react';
import { createClient } from "@/utils/supabase/client";
import { Card } from "flowbite-react";

const PackageDetail: React.FC<any> = ({ params }) => {
  const [packageData, setPackageData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const supabase = createClient();
  const { id } = params;

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const { data: packageDetails, error: packageError } = await supabase
          .from('packages')
          .select(`
            id, name, description, image_url,
            destinations (id, name),
            itineraries (id, day, description),
            includes (id, item),
            excludes (id, item)
          `)
          .eq('id', id)
          .single();

        if (packageError) throw packageError;

        setPackageData(packageDetails);
      } catch (error: any) {
        console.error('Error fetching package data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!packageData) {
    return <div>Error loading package data</div>;
  }

  return (
    <div className="min-h-screen w-full py-8">
      <header className="text-center py-10">
        <h1 className="text-4xl font-bold">Detail Paket - {packageData.name}</h1>
      </header>
      <Card className="max-w-4xl mx-auto">
        <img src={packageData.image_url} alt={`Trip ${id}`} className="w-full h-64 object-cover rounded-t-lg" />
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Deskripsi</h2>
          <p className="mt-2">{packageData.description}</p>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Daerah Wisata</h2>
          <ul className="list-disc ml-6 mt-2">
            {packageData.destinations.map((destination: any) => (
              <li key={destination.id}>{destination.name}</li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Itinerary</h2>
          {packageData.itineraries.map((itinerary: any) => (
            <p key={itinerary.id} className="mt-2">Day {itinerary.day}: {itinerary.description}</p>
          ))}
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Include Paket</h2>
          <ul className="list-disc ml-6 mt-2">
            {packageData.includes.map((include: any) => (
              <li key={include.id}>{include.item}</li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Not Include</h2>
          <ul className="list-disc ml-6 mt-2">
            {packageData.excludes.map((exclude: any) => (
              <li key={exclude.id}>{exclude.item}</li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex space-x-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded">Pesan Sekarang</button>
          <button className="bg-green-500 text-white py-2 px-4 rounded">Konsultasi WA</button>
        </div>
      </Card>
    </div>
  );
};

export default PackageDetail;
