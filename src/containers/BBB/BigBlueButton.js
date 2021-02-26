import React from "react";
import bbb from "bigbluebutton-js";
import Button from "components/Button/Button";

export default function BigBlueButton() {
  const api = bbb.api(
    process.env.BBB_URL || `http://bbb.coid.co.ke/bigbluebutton/`,
    process.env.BBB_SECRET || "ECCJZNJWLPEA3YB6Y2LTQGQD3GJZ3F93"
  );

  const http = bbb.http;

  // api module itself is responsible for constructing URLs
  let meetingCreateUrl = api.administration.create("My Meeting", "1", {
    duration: 2,
    attendeePW: "secret",
    moderatorPW: "supersecret",
  });

  const getBBB = () => {
    http(meetingCreateUrl).then((result) => {
      console.log(result);

      let moderatorUrl = api.administration.join(
        "moderator",
        "1",
        "supersecret"
      );
      let attendeeUrl = api.administration.join("attendee", "1", "secret");
      console.log(
        `Moderator link: ${moderatorUrl}\nAttendee link: ${attendeeUrl}`
      );

      let meetingEndUrl = api.administration.end("1", "supersecret");
      console.log(`End meeting link: ${meetingEndUrl}`);
    });
  };

  // http method should be used in order to make calls

  return (
    <div style={{ marginTop: "80px" }}>
      <p>Big Blue Button Conf</p>
      <Button onClick={getBBB} title={`Set Session`} />
    </div>
  );
}
