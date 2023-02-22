import useAuth from "../hooks/useAuth";
import useQuiosco from "../hooks/useQuiosco";
import { Category } from "./Category";

export const Sidebar = () => {
  const { logout, user } = useAuth({ middleware: "auth" });
  const { categories } = useQuiosco();
  return (
    <aside className="md:w-72">
      <div className="p-4">
        <img src="img/logo.svg" className="w-40" alt="logo" />
      </div>
      <p className="my-10 text-xl text-center">Hola : {user?.name}</p>
      <div className="mt-10">
        {categories.map((category) => (
          <Category category={category} key={category.id} />
        ))}
      </div>
      <div className="my-5 px-5">
        <button
          className="text-center p-3 text-white w-full font-bold truncate bg-red-500"
          onClick={logout}
        >
          Cancelar orden
        </button>
      </div>
    </aside>
  );
};
