import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import axiosClient from "../config/axios";

const useAuth = ({ middleware, url }) => {
  const token = localStorage["AUTH_TOKEN"];

  const navigate = useNavigate();

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/user", () =>
    axiosClient("/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        throw Error(error?.response?.data?.errors);
      })
  );

  useEffect(() => {
    if (middleware === "guest" && url && user) {
      navigate(url);
    }
    if (middleware === "guest" && user && user.is_admin) {
      navigate("/admin");
    }
    if (middleware === "admin" && user && !user.is_admin) {
      navigate("/");
    }
    if (middleware === "auth" && error) {
      navigate("/auth/login");
    }
  }, [user, error]);

  const login = async (data, setErrors) => {
    try {
      const { data: response } = await axiosClient.post("/api/login", data);
      localStorage.setItem("AUTH_TOKEN", response?.token);
      setErrors([]);
      await mutate();
    } catch (error) {
      if (error.response?.data.errors) {
        setErrors(Object.values(error.response.data.errors));
      }
    }
  };

  const register = async (data, setErrors) => {
    try {
      const { data: response } = await axiosClient.post("/api/register", data);
      localStorage.setItem("AUTH_TOKEN", response?.token);
      setErrors([]);
      await mutate();
    } catch (error) {
      if (error.response.data.errors) {
        setErrors(Object.values(error.response.data.errors));
      }
    }
  };

  const logout = async () => {
    try {
      await axiosClient.post("/api/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("AUTH_TOKEN");
      await mutate(undefined);
    } catch (error) {
      throw Error(error?.response?.data?.errors);
    }
  };

  return {
    login,
    register,
    logout,
    user,
    error,
  };
};

export default useAuth;
