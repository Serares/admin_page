import axios from "../config/Axios";

const Auth = {
  login(data: any) {
    return axios.post(`admin/login`, {
      ...data
    });
  },
  sigup(data: any) {
    return axios.post("admin/signup", data);
  }
};

export default Auth;
