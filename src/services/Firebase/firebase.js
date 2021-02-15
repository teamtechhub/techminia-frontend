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

//Todo : add darasa firebase  ..

// const config = {
//   apiKey: "AIzaSyB180-Eq1kXub0k3zM3R_8oduoLSjps-a8",
//   authDomain: "upwatest.firebaseapp.com",
//   databaseURL: "https://upwatest.firebaseio.com",
//   projectId: "upwatest",
//   storageBucket: "upwatest.appspot.com",
//   messagingSenderId: "602787972027",
//   appId: "1:602787972027:web:444940142702e300463a9e",
// };

// ken firebase creditials being used in production
var config = {
  apiKey: "AIzaSyC7XzX7_9BudtaQl7Zku8DHdJXhm59HsL8",
  authDomain: "darasa-e7581.firebaseapp.com",
  databaseURL: "https://darasa-e7581-default-rtdb.firebaseio.com",
  projectId: "darasa-e7581",
  storageBucket: "darasa-e7581.appspot.com",
  messagingSenderId: "974265521857",
  appId: "1:974265521857:web:8840d348136f18a199a640",
  measurementId: "G-B19J7Y211G",
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
