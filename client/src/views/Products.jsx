import React from "react";
import useSWR from "swr";
import { Product } from "../components/Product";
import axiosClient from "../config/axios";

const Products = () => {
  const token = localStorage["AUTH_TOKEN"];

  const fetcher = () =>
    axiosClient("/api/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.data.data);

  const { data, error, isLoading } = useSWR("/api/products", fetcher, {
    refreshInterval: 10000,
  });

  return isLoading ? (
    "Cargando"
  ) : (
    <>
      <h1 className="text-4xl font-black">Productos</h1>
      <p className="text-2xl my-10">Maneja la disponibilidad desde aquí</p>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {data?.map((product) => (
          <Product key={product.id} product={product} availableButton />
        ))}
      </div>
    </>
  );
};

export default Products;
