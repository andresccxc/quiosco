import React from "react";
import useSWR from "swr";
import { Product } from "../components";
import axiosClient from "../config/axios";
import useQuiosco from "../hooks/useQuiosco";

export default function Home() {
  const { currentCategory } = useQuiosco();
  const token = localStorage["AUTH_TOKEN"];
  const fetcher = () =>
    axiosClient("/api/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.data.data);

  const { data, isLoading } = useSWR("/api/products", fetcher, {
    refreshInterval: 1000,
  });

  if (isLoading) return "Cargando";

  const products = data?.filter(
    (item) => item.category_id === currentCategory.id
  );

  return (
    <>
      <h1 className="text-4xl font-black">{currentCategory.name}</h1>
      <p className="text-2xl my-10">
        Elige y personaliza tu pedido a continuación
      </p>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {products?.map((product) => (
          <Product key={product.id} product={product} addButton />
        ))}
      </div>
    </>
  );
}
