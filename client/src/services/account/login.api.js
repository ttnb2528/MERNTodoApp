import axios from "axios";
import { LOGIN } from "../apiConstants.js";

export function API_LOGIN(data) {
  console.log(data);
  return axios({
    method: "post",
    url: LOGIN,
    data,
    //   headers: { auth: auth },
    //   params: { roomId: roomId },
  });
}
