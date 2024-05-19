import { useAuthStore } from "../store/auth";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

export const setAuthUser = (access_token, refresh_token) => {
  Cookies.set("access_token", access_token, {
    expires: 1,
    secure: true,
  });

  Cookies.set("refresh_token", refresh_token, {
    expires: 7,
    secure: true,
  });

  const user = jwt_decode(access_token) ?? null;

  if (user) {
    useAuthStore.getState().setUser(user);
  }
  useAuthStore.getState().setLoading(false);
};

export const login = async (email, password) => {
  try {
    const { data, status } = await axios.post("user/token/", {
      email,
      password,
    });

    if (status === 200) {
      setAuthUser(data.access, data.refresh);
      alert("Доступ разрешён");
    }
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.response.data?.detail || "Что-то другоу отвалилось!",
    };
  }
};

export const register = async (full_name, email, password, password2) => {
  try {
    const { data } = await axios.post("user/register/", {
      full_name,
      email,
      password,
      password2,
    });
    await login(email, password);
    alert("Регистрация прошла успешно, вы залогинились!");
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error:
        `${error.response.data.full_name} - ${error.response.data.email}` ||
        "Что-то отвалилось!",
    };
  }
};

export const getRefreshToken = async () => {
  const refresh_token = Cookies.get("refresh_token");
  axios.post("user/token/refresh/", {
    refresh: refresh_token,
  });
  return response.data;
};

export const isAccessTokenExpired = (access_token) => {
  try {
    const decodeToken = jwt_decode(access_token);
    return decodeToken.exp < Date.now() / 1000;
  } 
  catch (error) {
    console.log(error);
    return true;
  }
};
