import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../components";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();

  const [errors, setErrors] = useState([]);

  const { login } = useAuth({ middleware: "guest", url: "/" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    login(data, setErrors);
  };

  return (
    <>
      <h1 className="text-4xl font-black">Iniciar sesión</h1>
      <p>Para crear ub pedido debes iniciar sesión</p>

      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form onSubmit={handleSubmit} noValidate>
          {errors?.map((error) => (
            <Alert key={error}>{error}</Alert>
          ))}

          <div className="mb-4">
            <label className="text-slate-800" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 w-full p-3 bg-gray-50"
              name="email"
              placeholder="Tu correo"
              ref={emailRef}
            />
          </div>

          <div className="mb-4">
            <label className="text-slate-800" htmlFor="password">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              className="mt-2 w-full p-3 bg-gray-50"
              name="password"
              placeholder="Tu contraseña"
              ref={passwordRef}
            />
          </div>

          <button
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 cursor-pointer"
            type="submit"
          >
            INICIAR SESIÓN
          </button>
        </form>
      </div>

      <nav className="mt-5">
        <Link to="/auth/register">¿No tienes cuenta? Crea una</Link>
      </nav>
    </>
  );
}
