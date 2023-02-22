import React, { useState, useEffect, useMemo } from "react";
import { formatPrice } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";

export const ProductModal = () => {
  const { handleAddOrder, handleClickModal, product, order } = useQuiosco();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(product.quantity || 1);
  }, [product]);

  const getProductStatus = () => {
    return order.length ? order.every((item) => item.id !== product.id) : true;
  };

  const isNewProduct = useMemo(() => getProductStatus(), [order, product]);

  return (
    <div className="md:flex gap-10 items-center">
      <div className="md:w-1/3">
        <img src={`./img/${product.image}.jpg`} alt="product" />
      </div>
      <div className="md:w-2/3">
        <div className="flex justify-end">
          <button onClick={handleClickModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        <h2 className="text-3xl font-bold mt-5">{product.name}</h2>
        <div className="flex gap-4 mt-5">
          <button
            onClick={() => {
              if (quantity === 1) return;
              setQuantity(quantity - 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <p className="text-3xl">{quantity}</p>
          <button
            onClick={() => {
              if (quantity >= 5) return;
              setQuantity(quantity + 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <p className="mt-5 font-black text-5xl text-amber-500">
          {formatPrice(product.price)}
        </p>

        <button
          className="bg-indigo-600 hover:bg-indigo-800 font-bold text-white rounded px-5 py-2 mt-5"
          onClick={() => {
            handleAddOrder({ ...product, quantity });
            handleClickModal();
          }}
        >
          {isNewProduct ? "AÑADIR AL PEDIDO" : "EDITAR PEDIDO"}
        </button>
      </div>
    </div>
  );
};
