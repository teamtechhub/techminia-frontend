import axios from "axios";
import jwtDecode from "jwt-decode";
const API_URL = "http://localhost:5000/api/user/";
//const API_URL = "http://192.168.225.23:5000/api/user/"

export function isAuthenticated() {
  const token = localStorage.getItem("userTicket");
  if (token) {
    return true;
  } else {
    return false;
  }
}

export function getGuestUser() {
  return { name: "Guest 123", userId: "guest123", email: "coolboy69@gg.com" };
}

export function authenticate(cb) {
  this.isAuthenticated = true;
  setTimeout(cb, 100); // fake async
}

export function signout(cb) {
  this.isAuthenticated = false;
  setTimeout(cb, 100);
}

export function loginWithGoogle(res) {
  var data = {
    name: res.profileObj.name,
    email: res.profileObj.email,
    image: res.profileObj.imageUrl,
  };

  return axios.post(API_URL + "login", data).then((response) => {
    console.log(response.data);
    if (response.data.accessToken) {
      localStorage.setItem(
        "userTicket",
        JSON.stringify(response.data.accessToken)
      );
    }
    return response.data;
  });
}

export function logout() {
  localStorage.removeItem("userTicket");
}

export function getCurrentUser() {
  return jwtDecode(localStorage.getItem("userTicket"));
}
