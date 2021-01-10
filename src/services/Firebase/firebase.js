import app from "firebase/app";
import "firebase/auth";

// var config = {
//   apiKey: "AIzaSyD_i8XtwncUQFkCmUbAUcxagempUNmlmrk",
//   authDomain: "darasa-298911.firebaseapp.com",
//   projectId: "darasa-298911",
//   storageBucket: "darasa-298911.appspot.com",
//   messagingSenderId: "678840442214",
//   appId: "1:678840442214:web:5415f690abe89c1ca4fca7",
//   measurementId: "G-GGJC20S0LD",
// };

const config = {
  apiKey: "AIzaSyB180-Eq1kXub0k3zM3R_8oduoLSjps-a8",
  authDomain: "upwatest.firebaseapp.com",
  databaseURL: "https://upwatest.firebaseio.com",
  projectId: "upwatest",
  storageBucket: "upwatest.appspot.com",
  messagingSenderId: "602787972027",
  appId: "1:602787972027:web:444940142702e300463a9e",
};
class firebaseApp {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(config);
    }
    this.auth = app.auth();
  }
}
export default firebaseApp;
