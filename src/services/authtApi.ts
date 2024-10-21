import apiConfig from "../api/ApiConfig";

export const apiRegister = (
  email: string,
  phone: number,
  password: string,
  name: string,
  birthday: Date,
  gender: string,
  address: string,
  idCard: string
): Promise<any> => {
  return apiConfig.post("/api/v1/auth/register", {
    email,
    phone,
    password,
    name,
    birthday,
    gender,
    address,
    idCard,
  });
};

export const apiLogin = (username: string, password: string): Promise<any> => {
  return apiConfig.post("/api/v1/auth/login", { username, password });
};

export const apiLogout = (): Promise<any> => {
  return apiConfig.post("/api/v1/auth/logout");
};
export const apiFetchUser = (): Promise<any> => {
  return apiConfig.get("/api/v1/auth/account");
};
