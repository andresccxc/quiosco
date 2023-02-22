import useQuiosco from "../hooks/useQuiosco";
import { ProductResume } from ".";
import { useMemo } from "react";
import { formatPrice } from "../helpers";
import useAuth from "../hooks/useAuth";

export const Resume = () => {
  const { logout } = useAuth({});
  const { order, handleSubmitOrder, totalOrder } = useQuiosco();

  const emptyOrder = !order.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitOrder();
    setTimeout(() => {
      localStorage.removeItem("AUTH_TOKEN");
      logout();
    }, [3000]);
  };

  return (
    <aside className="w-72 h-screen overflow-y-scroll p-5">
      <h2 className="text-4xl font-black">Mi pedido</h2>
      <p className="my-5 text-lg">
        Aquí podrás ver el resumen y totales de tu pedido
      </p>
      <div className="py-10">
        {order.length ? (
          order.map((product) => (
            <ProductResume key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center text-2xl">
            No hay elementos en tu pedido aún
          </p>
        )}
        <p className="text-xl mt-10">Total: {formatPrice(totalOrder)}</p>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mt-5">
            <button
              className={`${
                emptyOrder
                  ? "bg-indigo-100"
                  : "bg-indigo-600 hover:bg-indigo-800"
              }  py-2 px-5 rounded text-white font-bold text-center w-full cursor-pointer`}
              type="submit"
              disabled={emptyOrder}
            >
              Confirmar pedido
            </button>
          </div>
        </form>
      </div>
    </aside>
  );
};
