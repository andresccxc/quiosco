import { createContext, useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import axiosClient from "../config/axios";
import useAuth from "../hooks/useAuth";

const QuioscoContext = createContext();

export const QuioscoProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({});
  const [modal, setModal] = useState(false);
  const [product, setProduct] = useState({});
  const [order, setOrder] = useState([]);
  const token = localStorage["AUTH_TOKEN"];

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const { data } = await axiosClient("/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(data.data);
      setCurrentCategory(data.data[0]);
    } catch (error) {
      console.log("el error", error);
    }
  };

  const handleClickCategory = (category) => setCurrentCategory(category);

  const handleClickModal = () => setModal(!modal);

  const handleSetProduct = (product) => {
    setProduct(order.find(({ id }) => id === product.id) || product);
  };

  const handleAddOrder = (product) => {
    if (order.every(({ id }) => id !== product.id)) {
      setOrder([...order, product]);
      return toast.success("Agregado el pedido");
    }
    setOrder(order.map((item) => (item.id === product.id ? product : item)));
    toast.success("Editado correctamente");
  };

  const handleEditQuantity = (product) => setProduct(product);

  const handleDeleteProduct = (id) => {
    setOrder(order.filter((product) => product.id !== id));
    toast.success("Eliminado del pedido");
  };

  const totalOrder = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order]
  );

  const handleSubmitOrder = async () => {
    try {
      const { data } = await axiosClient.post(
        "/api/orders",
        {
          total: totalOrder,
          products: order.map(({ id, quantity }) => ({ id, quantity })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message);
      setTimeout(() => setOrder([]), [1000]);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleClickCompleteOrder = async (id) => {
    try {
      await axiosClient.put(`/api/orders/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {}
  };

  const handleClickSoldOut = async (id) => {
    try {
      await axiosClient.put(`/api/products/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {}
  };

  return (
    <QuioscoContext.Provider
      value={{
        categories,
        currentCategory,
        handleClickCategory,
        modal,
        handleClickModal,
        product,
        handleSetProduct,
        order,
        handleAddOrder,
        handleEditQuantity,
        handleDeleteProduct,
        handleSubmitOrder,
        totalOrder,
        handleClickCompleteOrder,
        handleClickSoldOut,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export default QuioscoContext;
