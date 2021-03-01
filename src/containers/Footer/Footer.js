import React from "react";
import Footer from "components/Footer/Footer";
//import { Location, Facebook, Twitter, Instagram } from "components/AllSvgIcon";
//import { SmartPhone } from "components/AllSvgIcon";
//import { Mail } from "components/AllSvgIcon";
import { Link } from "react-router-dom";

//
import SocialFooterComponent from "./social_component";
// const socialLinksAndNames = [
//   {
//     name: "facebook",
//     url: "https://www.facebook.com/",
//   },
//   {
//     name: "twitter",
//     url: "https://www.twitter.com/",
//   },
//   {
//     name: "instagram",
//     url: "https://www.instagram.com/",
//   },
//   {
//     name: "tiktok",
//     url: "https://www.tiktok.com/",
//   },
//   {
//     name: "tiktok",
//     url: "https://www.tiktok.com/",
//   },
//   {
//     name: "pintrest",
//     url: "https://www.pintrest.com/",
//   },
//   {
//     name: "youtube",
//     url: "https://www.youtube.com/",
//   },
//   {
//     name: "linkedin",
//     url: "https://www.linkedin.com/",
//   },
// ];

export default function FooterContainer() {
  return (
    <>
      <Footer>
        {/* <Footer.Wrapper>
          <Footer.Row>
            <Footer.Column>
              <Footer.Title>ABOUT DARASA</Footer.Title>
              <Footer.Text>
                Darasa is a complete online learning solution that enables
                students to learn at their own pace, first filling in gaps in
                their understanding and then accelerating their learning.
              </Footer.Text>
              <Footer.Title> </Footer.Title>
              <Footer.Title>CONTACT INFORMATION</Footer.Title>
              <Footer.Text>
                <Location />
                Karen, Nairobi
              </Footer.Text>
              <Footer.Text>
                <SmartPhone />
                0719100719
              </Footer.Text>
              <Footer.Link href="mailto:info@darasa.co.ke">
                <Mail />
                info@darasa.co.ke
              </Footer.Link>
            </Footer.Column>
            <Footer.Column style={{ display: "flex" }}>
              <div>
                <Footer.Title>FOLLOW US</Footer.Title>
                <Footer.Link href="https://facebook.com">
                  <Facebook />
                </Footer.Link>
                <Footer.Link href="https://www.instagram.com">
                  <Instagram />
                </Footer.Link>
                <Footer.Link href="https://twitter.com">
                  <Twitter />
                </Footer.Link>
              </div>
            </Footer.Column>
            <Footer.Column>
              <Footer.Title>SECONDARY CLASSES</Footer.Title>
              <Footer.Link href="#">Form 1</Footer.Link>
              <Footer.Link href="#">Form 2</Footer.Link>
              <Footer.Link href="#">Form 3</Footer.Link>
              <Footer.Link href="#">Form 4</Footer.Link>
            </Footer.Column>
            <Footer.Column>
              <Footer.Title>QUICK LINKS</Footer.Title>
              <Footer.Link href="#">Classes</Footer.Link>
              <Footer.Link href="#">Tuition</Footer.Link>
              <Footer.Link href="#">Teacher Dashboard</Footer.Link>
              <Footer.Link href="#">Student Dashboard</Footer.Link>
              <Footer.Link href="#">Library</Footer.Link>
              <Footer.Link href="#">Terms and Conditions</Footer.Link>
              <Footer.Link href="#">Privacy Policy</Footer.Link>
            </Footer.Column>>
                0719100719
              </Footer.Text>
              <Footer.Link href="mailto:info@darasa.co.ke">
                <Mail />
                info@darasa.co.ke
              </Footer.Link>
            </Footer.Column>
            <Footer.Column style={{ display: "flex" }}>
              <div>
                <Footer.Title>FOLLOW US</Footer.Title>
                <Footer.Link href="https://facebook.com">
                  <Facebook />
                </Footer.Link>
                <Footer.Link href="https://www.instagram.com">
                  <Instagram />
                </Footer.Link>
                <Footer.Link href="https://twitter.com">
                  <Twitter />
                </Footer.Link>
              </div>
            </Footer.Column>
            <Footer.Column>
              <Footer.Title>SECONDARY CLASSES</Footer.Title>
              <Footer.Link href="#">Form 1</Footer.Link>
              <Footer.Link href="#">Form 2</Footer.Link>
              <Footer.Link href="#">Form 3</Footer.Link>
              <Footer.Link href="#">Form 4</Footer.Link>
            </Footer.Column>
            <Footer.Column>
              <Footer.Title>QUICK LINKS</Footer.Title>
              <Footer.Link href="#">Classes</Footer.Link>
              <Footer.Link href="#">Tuition</Footer.Link>
              <Footer.Link href="#">Teacher Dashboard</Footer.Link>
              <Footer.Link href="#">Student Dashboard</Footer.Link>
              <Footer.Link href="#">Library</Footer.Link>
              <Footer.Link href="#">Terms and Conditions</Footer.Link>
              <Footer.Link href="#">Privacy Policy</Footer.Link>
            </Footer.Column>
          </Footer.Row>
        </Footer.Wrapper> */}
        <div
          style={{
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          <h3 style={{ textAlign: "center", color: "yellow" }}>About Darasa</h3>
          <p>
            Darasa is a haven that embraces the current age and revolutionizes
            the way students learn and study for their exams in preparation for
            higher education and what comes after
          </p>
          <p>
            We believe that revision materials should be equally and easily
            accessible to every student and candidate in kenya
          </p>
          <p>
            {" "}
            Using expert teachers, technology and media, we hope to make
            learning a fun and exiciting experience for students
          </p>
          <h5 style={{ color: "yellow" }}> Contact Information</h5>
          <p>Info@darasa.co.ke</p>
          <p>+254202022002</p>
          <h5 style={{ color: "yellow" }}> Follow Us</h5>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SocialFooterComponent />
          </div>
        </div>
      </Footer>
      <Footer
        style={{
          backgroundColor: "#652e8d",
          padding: "0",
        }}
      >
        <Footer.Wrapper>
          <Footer.Row
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(460px, 1fr))",
            }}
          >
            <Footer.Column>
              <Footer.Text>
                <small>
                  &copy; DARASA {new Date().getFullYear()}, ALL RIGHTS RESERVED
                </small>
              </Footer.Text>
            </Footer.Column>
            <Footer.Column style={{ display: "flex" }}>
              <div className="space-x-3">
                <Link to="/">
                  <small>HOME</small>
                </Link>

                {/* <Footer.Link href="#">
                  <small>TUITION</small>
                </Footer.Link> */}
                {/* <Footer.Link href="#">
                  <small>CLASSES</small>
                </Footer.Link> */}
                <Link to="/coming-soon">
                  <small>LIBRARY</small>
                </Link>
                <Link to="/auth/teacher">
                  <small>BECOME A TEACHER</small>
                </Link>
                <Link to="/contact-us">
                  <small>CONTACT</small>
                </Link>
              </div>
            </Footer.Column>
          </Footer.Row>
        </Footer.Wrapper>
      </Footer>
    </>
  );
}
