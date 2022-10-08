import { get, post } from "../fetch";

export const getUserInfoByid = (id: string) => {
  return get("/api/v1/user/info?id="+id);
};

export const login = ( username: string, password: string, code: string) => {
  return post("/api/v1/user/login",{
    'username':username,
    'password':password,
    'code':code,
  });
};
