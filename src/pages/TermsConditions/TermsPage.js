import Sticky from "react-stickynode";
import {
  StyledContainer,
  StyledContent,
  StyledLink,
  StyledLeftContent,
  StyledLeftInnerContent,
  StyledRightContent,
  StyledContentHeading,
} from "./TermsConditions.style";
import { Heading } from "components/heading/heading";
import { Element } from "react-scroll";
import { SEO } from "components/seo";
import { useMedia } from "utils/useMedia";
import { siteTermsAndServices } from "./site-terms-and-services";

const TermsPage = () => {
  const { title, date, content } = siteTermsAndServices;
  const mobile = useMedia("(max-width: 580px)");

  const menuItems = [];
  content.forEach((item) => {
    menuItems.push(item.title);
  });

  return (
    <>
      <SEO title={title} description="Darasa privacy page" />

      <StyledContainer>
        <Heading title={title} subtitle={`Last update: ${date}`} />

        <StyledContent>
          <StyledLeftContent>
            <Sticky top={mobile ? 68 : 150} innerZ="1">
              <StyledLeftInnerContent>
                {menuItems.map((item) => (
                  <StyledLink
                    key={item}
                    activeClass="active"
                    to={item}
                    spy={true}
                    smooth={true}
                    offset={-276}
                    duration={500}
                  >
                    {item}
                  </StyledLink>
                ))}
              </StyledLeftInnerContent>
            </Sticky>
          </StyledLeftContent>
          <StyledRightContent>
            {content.map((item, idx) => {
              return (
                <Element
                  name={item.title}
                  style={{ paddingBottom: 40 }}
                  key={idx}
                >
                  <StyledContentHeading>{item.title}</StyledContentHeading>
                  <div
                    className="html-content"
                    dangerouslySetInnerHTML={{
                      __html: item.description,
                    }}
                  />
                </Element>
              );
            })}
          </StyledRightContent>
        </StyledContent>
      </StyledContainer>
    </>
  );
};

export default TermsPage;
