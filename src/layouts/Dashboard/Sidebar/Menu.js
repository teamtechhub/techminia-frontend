import React from "react";
import { usePrevious, useMeasure } from "utils/hooks";
import { useSpring, animated } from "react-spring";
import { Frame, Content, Header, IconWrapper, NavLink } from "./Sidebar.style";
import * as Icons from "components/AllSvgIcon";

const Tree = React.memo(
  ({
    children,
    name,
    icon,
    isOpen,
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
    const Icon = icon ? Icons[icon] : depth === "child" ? Icons["Minus"] : null;
    return (
      <Frame depth={depth}>
        {/* <Title onClick={onClick}>{name}</Title> */}
        <NavLink
          to={`${path}${url}`}
          // to={depth === "parent" ? null : `${path}${url}`}
          exact={exact}
          style={{
            color: "#652e8d",
            backgroundColor: "#f7f7f7",
            borderRadius: "50px",
          }}
          // activeStyle={{
          //   color: "#652e8d",
          //   backgroundColor: "#f7f7f7",
          //   borderRadius: "0 50px 50px 0",
          // }}
          onClick={onClick}
        >
          <Header open={isOpen} depth={depth} className={depth}>
            {name}
            {Icon !== null && (
              <IconWrapper depth={depth}>
                <Icon />
              </IconWrapper>
            )}
          </Header>
        </NavLink>

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
            key={subOption.title}
            name={subOption.title}
            icon={subOption.icon}
            exact={subOption.exact}
            path={path}
            url={subOption.url}
            depth="child"
            onClick={() => setActiveLink(subOption.title)}
            isOpen={active === subOption.title}
          />
        );
      }
      return (
        <Tree
          key={subOption.title}
          name={subOption.title}
          icon={subOption.icon}
          exact={subOption.exact}
          path={path}
          url={subOption.url}
          depth="parent"
          onClick={() => setActiveLink(subOption.title)}
          isOpen={true}
        >
          {handler(subOption.children)}
        </Tree>
      );
    });
  };
  return <>{handler(data)}</>;
};
