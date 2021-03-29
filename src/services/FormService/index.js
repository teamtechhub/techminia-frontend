import axios from "axios";
const API_URL = "http://localhost:5000/api/form/";
import { logToConsole } from "utils/logging";

export function getForms(userId) {
  return axios.get(API_URL + "getuserforms/" + userId).then((response) => {
    return response.data;
  });
}

export function createForm(data) {
  logToConsole(data);
  return axios.post(API_URL + "create", data).then((response) => {
    logToConsole(response.data);
    return response.data;
  });
}

export function getForm(formId) {
  return axios.get(API_URL + "form/" + formId).then((response) => {
    //  logToConsole(response.data);
    return response.data;
  });
}

export function autoSave(data) {
  logToConsole(data);
  return axios.put(API_URL + "/editform/", data).then((response) => {
    logToConsole(response.data);
    return response.data;
  });
}

export function submitResponse(data) {
  logToConsole(data);
  return axios.post(API_URL + "addresponse", data).then((response) => {
    logToConsole(response.data);
    return response.data;
  });
}

export function getResponse(formId) {
  //  logToConsole(formId);
  return axios.get(API_URL + "getresponse/" + formId).then((response) => {
    // logToConsole(response.data);
    return response.data;
  });
}
