import React from "react";
import { usePrevious, useMeasure } from "utils/hooks";
import { useSpring, animated } from "react-spring";
import { Frame, Content, Header, IconWrapper, Title } from "./Students.style";
import * as Icons from "components/AllSvgIcon";

const Tree = React.memo(
  ({
    children,
    name,
    isOpen = true,
    onClick,
    depth,
    path,
    url,
    exact,
    defaultOpen = false,
  }) => {
    const previous = usePrevious(isOpen);
    const [bind, { height: viewHeight }] = useMeasure();
    const { height, opacity, transform } = useSpring({
      from: { height: 0, opacity: 0, transform: "translate3d(20px,0,0)" },
      to: {
        height: isOpen ? viewHeight : 0,
        opacity: isOpen ? 1 : 0,
        transform: `translate3d(${isOpen ? 0 : 20}px,0,0)`,
      },
    });
    const Icon = depth === "child" ? Icons["Minus"] : null;
    return (
      <Frame depth={depth}>
        <Header open={isOpen} depth={depth} className={depth}>
          {name}
          {Icon !== null && (
            <IconWrapper depth={depth}>
              <Icon />
            </IconWrapper>
          )}
          <Title onClick={onClick}>{name}</Title>
        </Header>

        <Content
          style={{
            opacity,
            height: isOpen && previous === isOpen ? "auto" : height,
          }}
        >
          <animated.div style={{ transform }} {...bind} children={children} />
        </Content>
      </Frame>
    );
  }
);

export const Menu = ({ data, path, className, setActiveLink, active }) => {
  const handler = (children) => {
    return children.map((subOption) => {
      if (!subOption.children) {
        return (
          <Tree
            key={subOption.name}
            name={subOption.name}
            path={path}
            url={subOption.url}
            depth="child"
          />
        );
      }
      return (
        <Tree
          key={subOption.name}
          name={subOption.name}
          path={path}
          url={subOption.url}
          depth="parent"
        >
          {handler(subOption.children)}
        </Tree>
      );
    });
  };
  return <>{handler(data)}</>;
};
