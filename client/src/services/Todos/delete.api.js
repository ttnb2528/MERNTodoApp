import axios from "axios";
import { DELETE_TODO } from "../apiConstants.js";

export function API_DELETE_TODO(auth, data) {
  return axios({
    method: "post",
    url: DELETE_TODO,
    data,
    headers: { auth: auth },
    //   params: { roomId: roomId },
  });
}
