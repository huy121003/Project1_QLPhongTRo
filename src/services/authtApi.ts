import axios from "../api/ApiConfig";

export const apiRegister = (
  email: string, password: string, name: string, age: number, gender: string, address: string
) => {
  return axios.post("/api/v1/auth/register", { email, password, name, age, gender, address});
};

export const apiLogin = (username: string, password: string) => {
  return axios.post("/api/v1/auth/login", { username, password });
};

export const apiLogout = () => {
  return axios.post("/api/v1/auth/logout");
};
export const apiFetchUser = () => {
  return axios.get("/api/v1/auth/me");
};
