// import { BASE_URL } from "constants/constants";
// import socketIOClient from "socket.io-client";
// import {w3cwebsockett as w3c } from 'websockets'

export default function subscribeToMpesaCallback(transactionID) {
  const mpesaSocket = new WebSocket(
    `ws://` +
      window.location.host +
      // `:` +
      // window.location.port +
      `/mpesa/` +
      transactionID +
      `/`
  );

  mpesaSocket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    console.log(data);
  };
  mpesaSocket.onclose = function (e) {
    console.log("mpesa connection closed");
  };

  // const socket = socketIOClient("ws://127.0.0.1:8000/");
  // socket.on("FromAPI", (data) => {
  //   alert(JSON.stringify(data, 4, null));
  // });
}
