import { useState, useEffect } from "react";
import { logToConsole } from "utils/logging";

function ErrorHandler({ err }) {
  logToConsole("the error", err);
  const [message, setMessage] = useState(false);
  const [code, setCode] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    logToConsole(err);
    if (!err.response) {
      // network error
      setError("Error: Network Error. Please report this server error");
      setMessage("Error: Network Error. Please report this server error");
    } else if (err.response) {
      if (err.response.status) {
        if (err.response.status === 100) {
          setMessage("Continue");
          setCode(100);
        }
        if (err.response.status === 101) {
          setMessage("Switching Protocol");
          setCode(101);
        }
        if (err.response.status === 102) {
          setMessage("Processing (WebDAV)");
          setCode(102);
        }
        if (err.response.status === 103) {
          setMessage("Early Hints");
          setCode(103);
        }

        if (err.response.status === 200) {
          setMessage("OK");
          setCode(200);
        }
        if (err.response.status === 201) {
          setMessage("Created");
          setCode(201);
        }
        if (err.response.status === 202) {
          setMessage("Accepted");
          setCode(202);
        }
        if (err.response.status === 203) {
          setMessage("Non-Authoritative Information");
          setCode(203);
        }
        if (err.response.status === 204) {
          setMessage("No Content");
          setCode(204);
        }
        if (err.response.status === 205) {
          setMessage("Reset Content");
          setCode(205);
        }
        if (err.response.status === 207) {
          setMessage("Multi-Status (WebDAV)");
          setCode(207);
        }
        if (err.response.status === 208) {
          setMessage("Already Reported (WebDAV)");
          setCode(208);
        }
        if (err.response.status === 226) {
          setMessage("IM Used (HTTP Delta encoding)");
          setCode(226);
        }
        if (err.response.status === 300) {
          setMessage("Multiple Choice");
          setCode(300);
        }
        if (err.response.status === 301) {
          setMessage("Moved Permanently");
          setCode(301);
        }
        if (err.response.status === 302) {
          setMessage("Found");
          setCode(302);
        }
        if (err.response.status === 303) {
          setMessage("See Other");
          setCode(303);
        }
        if (err.response.status === 304) {
          setMessage("Not Modified");
          setCode(304);
        }
        if (err.response.status === 305) {
          setMessage("Use Proxy ");
          setCode(305);
        }
        if (err.response.status === 306) {
          setMessage("unused");
          setCode(306);
        }
        if (err.response.status === 307) {
          setMessage("Temporary Redirect");
          setCode(307);
        }
        if (err.response.status === 308) {
          setMessage("Permanent Redirect");
          setCode(308);
        }

        if (err.response.status === 400) {
          setMessage("Bad Request");
          setCode(400);
        }
        if (err.response.status === 401) {
          setMessage("Unauthorized");
          setCode(401);
        }
        if (err.response.status === 402) {
          setMessage("Payment Required ");
          setCode(402);
        }
        if (err.response.status === 403) {
          setMessage("Forbidden");
          setCode(403);
        }
        if (err.response.status === 404) {
          setMessage("Not Found");
          setCode(404);
        }
        if (err.response.status === 405) {
          setMessage("Method Not Allowed");
          setCode(405);
        }
        if (err.response.status === 406) {
          setMessage("Not Acceptable");
          setCode(406);
        }
        if (err.response.status === 408) {
          setMessage("Request Timeout");
          setCode(408);
        }
        if (err.response.status === 409) {
          setMessage("Conflict");
          setCode(409);
        }
        if (err.response.status === 411) {
          setMessage("Length Required");
          setCode(411);
        }
        if (err.response.status === 412) {
          setMessage("Precondition Failed");
          setCode(412);
        }
        if (err.response.status === 413) {
          setMessage("Payload Too Large");
          setCode(413);
        }
        if (err.response.status === 414) {
          setMessage("URI Too Long");
          setCode(414);
        }
        if (err.response.status === 415) {
          setMessage("Unsupported Media Type");
          setCode(415);
        }
        if (err.response.status === 416) {
          setMessage("Range Not Satisfiable");
          setCode(416);
        }
        if (err.response.status === 417) {
          setMessage("Expectation Failed");
          setCode(417);
        }
        if (err.response.status === 418) {
          setMessage("I'm a teapot");
          setCode(418);
        }
        if (err.response.status === 421) {
          setMessage("Misdirected Request");
          setCode(421);
        }
        if (err.response.status === 422) {
          setMessage("Unprocessable Entity (WebDAV)");
          setCode(422);
        }
        if (err.response.status === 423) {
          setMessage("Locked (WebDAV)");
          setCode(423);
        }
        if (err.response.status === 424) {
          setMessage("Failed Dependency (WebDAV)");
          setCode(424);
        }
        if (err.response.status === 425) {
          setMessage("Too Early");
          setCode(425);
        }
        if (err.response.status === 426) {
          setMessage("Upgrade Required");
          setCode(426);
        }
        if (err.response.status === 428) {
          setMessage("Precondition Required");
          setCode(428);
        }
        if (err.response.status === 429) {
          setMessage("Too Many Requests");
          setCode(429);
        }
        if (err.response.status === 431) {
          setMessage("Request Header Fields Too Large");
          setCode(431);
        }
        if (err.response.status === 451) {
          setMessage("Unavailable For Legal Reasons");
          setCode(451);
        }

        if (err.response.status === 500) {
          setMessage("Internal Server Error");
          setCode(500);
        }
        if (err.response.status === 501) {
          setMessage("Not Implemented");
          setCode(501);
        }
        if (err.response.status === 502) {
          setMessage("Bad Gateway");
          setCode(502);
        }
        if (err.response.status === 503) {
          setMessage("Service Unavailable");
          setCode(503);
        }
        if (err.response.status === 504) {
          setMessage("Gateway Timeout");
          setCode(504);
        }
        if (err.response.status === 505) {
          setMessage("HTTP Version Not Supported");
          setCode(505);
        }
        if (err.response.status === 506) {
          setMessage("Variant Also Negotiates");
          setCode(506);
        }
        if (err.response.status === 507) {
          setMessage("Insufficient Storage (WebDAV)");
          setCode(507);
        }
        if (err.response.status === 508) {
          setMessage("Loop Detected (WebDAV)");
          setCode(508);
        }
        if (err.response.status === 510) {
          setMessage("Not Extended");
          setCode(510);
        }
        if (err.response.status === 511) {
          setMessage("Network Authentication Required");
          setCode(511);
        }

        setError(err.response.data);
      }
    } else {
      if (err.message === "Error: Network Error.") {
        setError("Error: Network Error. Please report this server error");
        setMessage("Error: Network Error. Please report this server error");
      } else {
        setError(err.message);
        setMessage(err.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { error, message, code };
}
export default ErrorHandler;
