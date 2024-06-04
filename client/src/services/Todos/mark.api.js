import axios from "axios";
import { MARK_TODO } from "../apiConstants.js";

export function API_MARK_TODO(auth, data) {
  return axios({
    method: "post",
    url: MARK_TODO,
    data,
    headers: { auth: auth },
    //   params: { roomId: roomId },
  });
}
