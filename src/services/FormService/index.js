import axios from "axios";
const API_URL = "http://localhost:5000/api/form/";

export function getForms(userId) {
  return axios.get(API_URL + "getuserforms/" + userId).then((response) => {
    return response.data;
  });
}

export function createForm(data) {
  console.log(data);
  return axios.post(API_URL + "create", data).then((response) => {
    console.log(response.data);
    return response.data;
  });
}

export function getForm(formId) {
  return axios.get(API_URL + "form/" + formId).then((response) => {
    //  console.log(response.data);
    return response.data;
  });
}

export function autoSave(data) {
  console.log(data);
  return axios.put(API_URL + "/editform/", data).then((response) => {
    console.log(response.data);
    return response.data;
  });
}

export function submitResponse(data) {
  console.log(data);
  return axios.post(API_URL + "addresponse", data).then((response) => {
    console.log(response.data);
    return response.data;
  });
}

export function getResponse(formId) {
  //  console.log(formId);
  return axios.get(API_URL + "getresponse/" + formId).then((response) => {
    // console.log(response.data);
    return response.data;
  });
}
