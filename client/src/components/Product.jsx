import React from "react";
import { formatPrice } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";

export const Product = ({
  product,
  addButton = false,
  availableButton = false,
}) => {
  const { handleClickModal, handleSetProduct, handleClickSoldOut } =
    useQuiosco();

  const { id, image, name, price } = product;

  const addProduct = () => {
    handleClickModal();
    handleSetProduct(product);
  };

  return (
    <div className="border p-3 shadow bg-white">
      <img className="w-full" src={`/img/${image}.jpg`} alt="product" />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{name}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatPrice(price)}
        </p>
        {addButton && (
          <button
            className="bg-indigo-600 hover:bg-indigo-700 font-bold text-white mt-5 w-full p-3"
            onClick={addProduct}
          >
            AGREGAR
          </button>
        )}
        {availableButton && (
          <button
            className="bg-indigo-600 hover:bg-indigo-700 font-bold text-white mt-5 w-full p-3"
            onClick={() => handleClickSoldOut(id)}
          >
            Producto agotado
          </button>
        )}
      </div>
    </div>
  );
};
