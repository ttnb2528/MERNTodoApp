import axios from "axios";
import { EDIT_TODO } from "../apiConstants.js";

export function API_EDIT_TODO(auth, data) {
  console.log(data);
  return axios({
    method: "put",
    url: EDIT_TODO,
    data,
    headers: { auth: auth },
    //   params: { roomId: roomId },
  });
}
