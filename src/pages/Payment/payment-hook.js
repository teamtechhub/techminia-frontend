import { BASE_URL } from "constants/constants";
import socketIOClient from "socket.io-client";

export default function subscribeToMpesaCallback() {
  const socket = socketIOClient(BASE_URL);
  socket.on("FromAPI", (data) => {
    alert(JSON.stringify(data, 4, null));
  });
}
