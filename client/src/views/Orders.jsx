import React from "react";
import useSWR from "swr";
import axiosClient from "../config/axios";
import { formatPrice } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";

const Orders = () => {
  const token = localStorage["AUTH_TOKEN"];

  const fetcher = () =>
    axiosClient("/api/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  const { data, isLoading } = useSWR("/api/orders", fetcher);

  const { handleClickCompleteOrder } = useQuiosco();

  return isLoading ? (
    "Cargando"
  ) : (
    <>
      <h1 className="text-4xl font-black">Ordenes</h1>
      <p className="text-2xl my-10">Administra las ordenes desde aquí</p>
      <div className="grid grid-cols-2 gap-5">
        {data?.data?.data?.map(({ user, ...item }) => (
          <div key={item.id} className="p-5 bg-white shadow space-y-2 border-b">
            <p className="font-bold text-slate-600 text-xl">
              Contenido del Pedido:
            </p>
            {item.products?.map(({ id, pivot, name }) => (
              <div
                key={id}
                className="border-b border-slate-200 last-of-type:border-none py-4"
              >
                <p className="text-sm">{name}</p>
                <p className="text-sm">
                  Cantidad:&nbsp;
                  <span className="font-bold">{pivot.quantity}</span>
                </p>
              </div>
            ))}

            <p className="text-lg font-bold text-slate-600">
              Cliente:&nbsp;
              <span className="font-normal">{user.name}</span>
            </p>

            <p className="text-lg font-bold text-amber-500">
              Total a pagar:&nbsp;
              <span className="font-normal text-slate-600">
                {formatPrice(item.total)}
              </span>
            </p>

            <button
              className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 rounded font-bold text-white w-full"
              onClick={() => handleClickCompleteOrder(item.id)}
            >
              COMPLETAR
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
export default Orders;
