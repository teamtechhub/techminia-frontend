import React, { useContext, useState } from "react";
import { withRouter, useHistory, Link } from "react-router-dom";
import {
  SidebarWrapper,
  MenuWrapper,
  // Svg,
  // LogoutBtn,
  LogoImage,
} from "./Sidebar.style";
import { AuthContext } from "contexts/auth/auth.context";
import Logoimage from "images/logo1.png";
// import { LogoutIcon } from "components/AllSvgIcon";
import { Menu } from "./Menu";
import {
  ProfileCard,
  ProfileCardBody,
  CardRow,
  ListGroup,
  ProfileCardHead,
  Li,
  B,
  A,
  ProfileListCol,
  ProfileListTitle,
  ProfileListText,
} from "pages/Profile/Profile.style";
import Button from "components/Button/Button";
import Moment from "react-moment";

export default withRouter(function Sidebar({
  refs,
  style,
  onMenuItemClick,
  isOpen,
  routes,
  path,
}) {
  const history = useHistory();
  const {
    authState: { profile },
  } = useContext(AuthContext);
  const [activeLink, setActiveLink] = useState(false);

  // const handleLogout = () => {
  //   if (typeof window !== "undefined") {
  //     localStorage.removeItem("access_token");
  //     localStorage.removeItem("refresh_token");
  //     localStorage.removeItem("darasa_auth_profile");
  //     localStorage.removeItem("darasa_auth_payload");
  //     localStorage.removeItem("darasa_auth_roles");
  //     localStorage.removeItem("darasa_applications");
  //     localStorage.removeItem("darasa_org_profile");
  //     localStorage.removeItem("darasa_individual_profile");
  //     authDispatch({ type: "SIGN_OUT" });
  //     history.push("/");
  //   }
  // };
  const setLink = (title) => {
    // onMenuItemClick();
    setActiveLink(title);
  };
  return (
    <SidebarWrapper ref={refs} style={style}>
      {isOpen ? (
        <Link to="/">
          <LogoImage src={Logoimage} alt="darasa" />
        </Link>
      ) : null}

      <MenuWrapper>
        <Menu
          data={routes}
          path={path}
          setActiveLink={setLink}
          active={activeLink}
        />
        <div style={{ direction: "ltr", position: "absolute", bottom: 0 }}>
          {profile.is_student &&
            (profile.subscription && profile.subscription.state === 1 ? (
              <ProfileCard
                style={{ backgroundColor: "#ffffff00", color: "#fff" }}
              >
                <ProfileCardHead className="card-topline">
                  <header>Account Details</header>
                </ProfileCardHead>
                <ProfileCardBody>
                  <ListGroup>
                    <Li style={{ padding: 0, backgroundColor: "#ffffff00" }}>
                      <B>Status</B>
                      <A>Active</A>
                    </Li>
                    <Li style={{ padding: 0, backgroundColor: "#ffffff00" }}>
                      <B>Subcription Package</B>
                      <A>{profile.subscription.reason}</A>
                    </Li>
                    <Li style={{ padding: 0, backgroundColor: "#ffffff00" }}>
                      <B>Start Date</B>
                      {/* <A>{moment(profile.subscription.start)}</A> */}
                      <A>
                        <Moment>{profile.subscription.start}</Moment>
                      </A>
                    </Li>
                    <Li style={{ padding: 0, backgroundColor: "#ffffff00" }}>
                      <B>Expiry Date</B>
                      {/* <A>{moment(profile.subscription.end)}</A> */}
                      <A>
                        <Moment>{profile.subscription.end} </Moment>
                      </A>
                    </Li>
                  </ListGroup>
                  <CardRow>
                    <ProfileListCol
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        flex: "100%",
                        maxWidth: "100%",
                      }}
                    >
                      <ProfileListTitle
                        style={{ color: "#fff", margin: "0 10px" }}
                      >
                        8
                      </ProfileListTitle>
                      <ProfileListText style={{ color: "#fff" }}>
                        Days to Next Payment
                      </ProfileListText>
                    </ProfileListCol>
                  </CardRow>
                </ProfileCardBody>
              </ProfileCard>
            ) : (
              <Button
                onClick={() => {
                  history.replace(`/dashboard/payment`);
                }}
                style={{
                  borderRadius: "20px",
                  backgroundColor: "#ec7623",
                  margin: "5px",
                }}
                title={`Make Payment`}
              />
            ))}
        </div>
      </MenuWrapper>

      {/* <LogoutBtn
        onClick={() => {
          handleLogout();
        }}
      >
        <Svg>
          <LogoutIcon />
        </Svg>
        Logout
      </LogoutBtn> */}
    </SidebarWrapper>
  );
});
