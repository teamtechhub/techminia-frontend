/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";

import {
  ProfileSidebar,
  ProfileContent,
  ProfileCard,
  ProfileCardBody,
  CardRow,
  ProfilePic,
  ProfileUserTitle,
  ProfileTitle,
  ProfileName,
  ListGroup,
  ProfileCardHead,
  Li,
  B,
  A,
  ProfileDescription,
  ProfileListCol,
  ProfileListTitle,
  ProfileListText,
  Ul,
} from "./Profile.style";
import { AuthContext } from "contexts/auth/auth.context";
import ImageWrapper from "components/Image/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PasswordChange from "containers/Authentication/passwordChange";
import DraftRenderer from "components/DraftRenderer/DraftRenderer";

const ProfileView = () => {
  const {
    authState: { profile },
  } = useContext(AuthContext);
  const [extendedProfile, setExtendedProfile] = useState({});

  useEffect(() => {
    setExtendedProfile(profile.extended_profile);
  }, [profile]);
  return (
    <>
      <ProfileSidebar>
        <ProfileCard className="card-topline">
          <ProfileCardBody>
            <CardRow>
              <ProfilePic>
                <ImageWrapper
                  src={profile.avatar}
                  className="img-responsive"
                  alt={profile.name}
                />
              </ProfilePic>
            </CardRow>
            <ProfileUserTitle>
              <ProfileName>
                {profile.is_teacher
                  ? `${extendedProfile.honorofic_title}. `
                  : null}
                {profile.surname}
              </ProfileName>
              <ProfileTitle>{profile.other_names}</ProfileTitle>
            </ProfileUserTitle>
            <ListGroup>
              <Li>
                <B>Phone Number</B>
                <A>{profile.phone_number}</A>
              </Li>
              <Li>
                <B>Email</B>
                <A>{profile.email}</A>
              </Li>
              <Li>
                <B>Date of Birth</B>
                <A>{profile.date_of_birth}</A>
              </Li>
            </ListGroup>
          </ProfileCardBody>
        </ProfileCard>
        <ProfileCard>
          <ProfileCardHead className="card-topline">
            <header>About</header>
          </ProfileCardHead>
          <ProfileCardBody>
            <ProfileDescription>
              {profile.about ? (
                <DraftRenderer content={profile.about} />
              ) : (
                `To be added ...`
              )}
            </ProfileDescription>
            <ListGroup>
              {profile.is_teacher && (
                <>
                  <Li>
                    <B>TSC ID</B>
                    <A>{extendedProfile.tsc_id}</A>
                  </Li>
                  <Li>
                    <B>National ID</B>
                    <A>{extendedProfile.national_id}</A>
                  </Li>
                </>
              )}
              {profile.is_student && (
                <>
                  <Li>
                    <B>Gender</B>
                    <A>{profile.gender}</A>
                  </Li>
                  <Li>
                    <B>Hobbies</B>
                    <A>
                      {extendedProfile.hobby
                        ? extendedProfile.hobby.map((hobby, index) => hobby)
                        : null}
                    </A>
                  </Li>
                </>
              )}
            </ListGroup>
            <CardRow className="list-seperated profile-stat">
              {profile.is_teacher && (
                <>
                  <ProfileListCol>
                    <ProfileListTitle>8</ProfileListTitle>
                    <ProfileListText>Subjects</ProfileListText>
                  </ProfileListCol>
                  <ProfileListCol>
                    <ProfileListTitle>
                      {extendedProfile.students ? 0 : extendedProfile.students}
                    </ProfileListTitle>
                    <ProfileListText>Students</ProfileListText>
                  </ProfileListCol>
                  <ProfileListCol>
                    <ProfileListTitle>8</ProfileListTitle>
                    <ProfileListText>Classes</ProfileListText>
                  </ProfileListCol>
                </>
              )}
              {profile.is_student && (
                <>
                  <ProfileListCol>
                    <ProfileListTitle>8</ProfileListTitle>
                    <ProfileListText>Subjects</ProfileListText>
                  </ProfileListCol>
                  <ProfileListCol>
                    <ProfileListTitle>2</ProfileListTitle>
                    <ProfileListText>Assignments</ProfileListText>
                  </ProfileListCol>
                  <ProfileListCol>
                    <ProfileListTitle>8</ProfileListTitle>
                    <ProfileListText>Exams</ProfileListText>
                  </ProfileListCol>
                </>
              )}
            </CardRow>
          </ProfileCardBody>
        </ProfileCard>
        <ProfileCard>
          <ProfileCardHead className="card-topline">
            <header>Performance</header>
          </ProfileCardHead>
          <ProfileCardBody>
            <Ul className="performance-list">
              <li>
                <a href="/">
                  <FontAwesomeIcon icon={"circle"} className="icon" /> Total
                  Classes
                  <span>22</span>
                </a>
              </li>
            </Ul>
          </ProfileCardBody>
        </ProfileCard>
      </ProfileSidebar>
      <ProfileContent>
        <ProfileCard>
          <ProfileCardHead className="card-topline">
            <header>Change Password</header>
          </ProfileCardHead>
          <ProfileCardBody>
            <PasswordChange />
          </ProfileCardBody>
        </ProfileCard>
      </ProfileContent>
    </>
  );
};

export default ProfileView;
