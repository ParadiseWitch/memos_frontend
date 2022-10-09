import { get, post } from "../utils/fetch";

export const login = ( username: any, password: any) => {
  return post("/api/v1/user/login",{
    'name':username,
    'password':password,
  });
};
