import axios from "axios";

export const instance = axios.create({
  baseURL: "https://yalantis-react-school-api.yalantis.com/api/task0",
});
