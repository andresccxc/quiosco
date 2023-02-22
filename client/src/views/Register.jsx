import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../components";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();

  const [errors, setErrors] = useState([]);

  const { register } = useAuth({ middleware: "guest", url: "/" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
    register(data, setErrors);
  };

  return (
    <>
      <h1 className="text-4xl font-black">Crea tu cuenta</h1>
      <p>Crea tu cuenta llenando el formulario</p>

      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form onSubmit={handleSubmit} noValidate>
          {errors?.map((error) => (
            <Alert key={error}>{error}</Alert>
          ))}
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="name">
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              className="mt-2 w-full p-3 bg-gray-50"
              name="name"
              placeholder="Tu nombre"
              ref={nameRef}
            />
          </div>

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

          <div className="mb-4">
            <label className="text-slate-800" htmlFor="password_confirmation">
              Repetir contraseña:
            </label>
            <input
              type="password"
              id="password_confirmation"
              className="mt-2 w-full p-3 bg-gray-50"
              name="password_confirmation"
              placeholder="Repetir contraseña"
              ref={passwordConfirmationRef}
            />
          </div>

          <button
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 cursor-pointer"
            type="submit"
          >
            CREAR CUENTA
          </button>
        </form>
      </div>
      <nav className="mt-5">
        <Link to="/auth/login">Ya tienes cuenta? Inicia sesión</Link>
      </nav>
    </>
  );
};

export default Register;
