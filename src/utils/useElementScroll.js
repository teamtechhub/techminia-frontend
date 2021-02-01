import throttle from "lodash-es/throttle";
import { useEffect, useState } from "react";

function getPosition(anchor) {
  if (!!anchor) {
    return {
      x: anchor.scrollLeft,
      y: anchor.scrollTop,
    };
  }
  return undefined;
}

export function isScrolledToBottom(anchor, position, offset = 0) {
  return !!anchor.current && position
    ? position.y + anchor.current.clientHeight + offset >=
        anchor.current.scrollHeight
    : undefined;
}

function useElementScroll(anchor) {
  const [scroll, setScroll] = useState(getPosition(anchor.current));

  useEffect(() => {
    if (!!anchor.current) {
      const handleScroll = throttle(
        () => setScroll(getPosition(anchor.current)),
        100
      );
      anchor.current.addEventListener("scroll", handleScroll);

      return () => {
        if (!!anchor.current) {
          anchor.current.removeEventListener("scroll", handleScroll);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchor.current]);

  useEffect(() => {
    setTimeout(() => setScroll(getPosition(anchor.current)), 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return scroll;
}
export default useElementScroll;
