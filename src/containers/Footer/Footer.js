import React from "react";
import Footer from "components/Footer/Footer";
import { Location, Facebook, Twitter, Instagram } from "components/AllSvgIcon";
import { SmartPhone } from "components/AllSvgIcon";
import { Mail } from "components/AllSvgIcon";

export default function FooterContainer() {
  return (
    <>
      <Footer>
        <Footer.Wrapper>
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
            </Footer.Column>
          </Footer.Row>
        </Footer.Wrapper>
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
              <div>
                <Footer.Link href="#">
                  <small>HOME</small>
                </Footer.Link>

                <Footer.Link href="#">
                  <small>TUITION</small>
                </Footer.Link>
                <Footer.Link href="#">
                  <small>CLASSES</small>
                </Footer.Link>
                <Footer.Link href="#">
                  <small>LIBRARY</small>
                </Footer.Link>
                <Footer.Link href="#">
                  <small>BECOME A TEACHER</small>
                </Footer.Link>
                <Footer.Link href="#">
                  <small>CONTACT</small>
                </Footer.Link>
              </div>
            </Footer.Column>
          </Footer.Row>
        </Footer.Wrapper>
      </Footer>
    </>
  );
}
