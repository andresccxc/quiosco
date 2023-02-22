import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const AdminSidebar = () => {
  const { logout } = useAuth({ middleware: "auth" });

  return (
    <aside className="md:w-72 h-screen">
      <div className="p4">
        <img className="w-40" src="/img/logo.svg" alt="logo" />
      </div>

      <nav className="flex flex-col p-4">
        <Link to="/admin" className="font-bold text-lg">
          Ordenes
        </Link>
        <Link to="/admin/products" className="font-bold text-lg">
          Products
        </Link>
      </nav>

      <div className="my-5 px-5">
        <button
          className="text-center p-3 text-white w-full font-bold truncate bg-red-500"
          onClick={logout}
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};
