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

export const login = async(email, password) => {
    try{
        const {data, status} = await axios.post('user/token/', {
            email, 
            password,
        });

        if(status === 200){
            setAuthUser(data.access, data.refresh);
            alert("Доступ разрешён");
        }
        return {data, error: null }
    
    }
    catch (error){
        return {
            data:null,
            error: error.response.data?.detail || "Что-то другоу отвалилось!"
        };
    }
}