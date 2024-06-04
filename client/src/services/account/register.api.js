import axios from "axios";
import { REGISTER } from "../apiConstants.js";

export function API_REGISTER(data) {
  console.log(data);
  return axios({
    method: "post",
    url: REGISTER,
    data,
    //   headers: { auth: auth },
    //   params: { roomId: roomId },
  });
}
