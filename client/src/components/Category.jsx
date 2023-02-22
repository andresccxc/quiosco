import React from "react";
import useQuiosco from "../hooks/useQuiosco";

export const Category = ({ category }) => {
  const { currrentCategory, handleClickCategory } = useQuiosco();

  const { icon, id, name } = category;

  return (
    <div
      className={`flex items-center gap-4 border p-3 hover:bg-amber-400 ${
        currrentCategory?.id === id ? "bg-amber-400" : ""
      } cursor-pointer`}
    >
      <img className="w-12" src={`/img/icono_${icon}.svg`} alt="categoría" />
      <button
        className="text-lg font-bold cursor-pointer truncate"
        onClick={() => handleClickCategory(category)}
      >
        {name}
      </button>
    </div>
  );
};
