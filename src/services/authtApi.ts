import apiConfig from "../api/ApiConfig";

export const apiRegister = (
  email: string, password: string, name: string, age: number, gender: string, address: string,idCard:string
):Promise<any> => {
  return apiConfig.post("/api/v1/auth/register", { email, password, name, age, gender, address});
};

export const apiLogin = (username: string, password: string):Promise<any> => {
  return apiConfig.post("/api/v1/auth/login", { username, password });
};

export const apiLogout = ():Promise<any> => {
  return apiConfig.post("/api/v1/auth/logout");
};
export const apiFetchUser = ():Promise<any> => {
  return apiConfig.get("/api/v1/auth/account");
};
