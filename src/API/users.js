import { instance } from "./instance";

export function FetchUsersList() {
  return instance.get("/users");
}
