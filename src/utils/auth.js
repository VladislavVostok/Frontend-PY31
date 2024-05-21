import { useAuthStore } from "../store/auth";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import apiInstance from './axios';

export const setAuthUser = (access_token, refresh_token) => {
  Cookies.set("access_token", access_token, {
    expires: 1,
    secure: true,
  });

  Cookies.set("refresh_token", refresh_token, {
    expires: 7,
    secure: true,
  });

  const user = jwtDecode(access_token) ?? null;

  if (user) {
    useAuthStore.getState().setUser(user);
  }
  useAuthStore.getState().setLoading(false);
};

export const login = async (email, password) => {
  try {

    const { data, status } = await apiInstance.post("/user/token/", {
      email,
      password,
    });


    if (status === 200) {
      setAuthUser(data.access, data.refresh);
      //alert("Доступ разрешён");
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
    const { data } = await apiInstance.post("user/register/", {
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
  const response = await apiInstance.post("user/token/refresh/", {
    refresh: refresh_token,
  });
  return response.data;
};

export const isAccessTokenExpired = (access_token) => {
  try {
    const decodeToken = jwtDecode(access_token);
    return decodeToken.exp < Date.now() / 1000;
  } catch (error) {
    console.log(error);
    return true;
  }
};

export const setUser = async () => {
  const access_token = Cookies.get("access_token");
  const refresh_token = Cookies.get("refresh_token");
  if (!access_token || !refresh_token) {
    return;
  }

  if (isAccessTokenExpired(access_token)) {
    const response = getRefreshToken(refresh_token);
    setAuthUser(response.access, response.refresh);
  } else {
    setAuthUser(access_token, refresh_token);
  }
};

export const logout = () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  useAuthStore.getState().setUser(null);
};