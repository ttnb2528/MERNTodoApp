import axios from "axios";
import { CREATE_TODO } from "../apiConstants.js";

export function API_CREATE_TODO(auth, data) {
  console.log(data);
  return axios({
    method: "post",
    url: CREATE_TODO,
    data,
    headers: { auth: auth },
    //   params: { roomId: roomId },
  });
}
