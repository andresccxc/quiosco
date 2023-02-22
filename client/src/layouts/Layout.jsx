import { Outlet } from "react-router-dom";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductModal, Resume, Sidebar } from "../components";
import useQuiosco from "../hooks/useQuiosco";
import { modalStyles } from ".";
import useAuth from "../hooks/useAuth";

Modal.setAppElement("#root");

export const Layout = () => {
  useAuth({ middleware: "auth" });
  const { modal } = useQuiosco();

  return (
    <>
      <div className="md:flex">
        <Sidebar />
        <main className="flex-1 h-screen overflow-y-auto bg-gray-100 p-3">
          <Outlet />
        </main>
        <Resume />
      </div>
      <Modal isOpen={modal} style={modalStyles}>
        <ProductModal />
      </Modal>
      <ToastContainer />
    </>
  );
};
