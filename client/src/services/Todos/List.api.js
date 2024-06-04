import axios from "axios";
import { LIST_TODO } from "../apiConstants.js";

export function API_LIST_TODO(auth) {
  return axios({
    method: "get",
    url: LIST_TODO,
    headers: { auth: auth },
    //   params: { roomId: roomId },
  });
}
