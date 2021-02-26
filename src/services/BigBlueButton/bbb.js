import bbb from "bigbluebutton-js";
import { BASE_URL } from "constants/constants";

class bigBlueButtonApp {
  constructor() {
    this.api = bbb.api(
      process.env.BBB_URL || `${BASE_URL}/bbb`,
      process.env.BBB_SECRET || "1234567890-=qwertyuiop["
    );
  }
}
export default bigBlueButtonApp;
