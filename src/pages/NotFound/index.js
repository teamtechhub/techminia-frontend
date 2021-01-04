import React from "react";
import { useLocation, Link } from "react-router-dom";

function NotFound() {
  let location = useLocation();

  return (
    <div>
      <h4>this is the 404 page.</h4>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
      <Link to="/">back to homepage</Link>
    </div>
  );
}
export default NotFound;
