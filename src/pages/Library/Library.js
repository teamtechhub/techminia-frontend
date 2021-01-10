import React from "react";
import { Modal } from "@redq/reuse-modal";
import { withApollo } from "utils/apollo";
import { SEO } from "components/seo";
import Sidebar from "containers/Sidebar/Sidebar";
import Products from "containers/ProductsList/ProductsList";
import CartPopUp from "containers/Cart/CartPopUp";
import {
  MainContentArea,
  SidebarSection,
  ContentSection,
} from "styles/pages.style";
import { useLocation } from "react-router-dom";

const PAGE_TYPE = "book";

function Library({ deviceType }) {
  console.log(deviceType);
  const location = useLocation();
  const targetRef = React.useRef(null);
  React.useEffect(() => {
    const query = new URLSearchParams(location.search);

    if ((query.get("text") || query.get("category")) && targetRef.current) {
      window.scrollTo({
        top: targetRef.current.offsetTop - 110,
        behavior: "smooth",
      });
    }
  }, [location]);

  return (
    <>
      <SEO title="Darasa - E-Library" description="Book Details" />
      <Modal>
        {deviceType.desktop ? (
          <>
            <MainContentArea>
              <SidebarSection>
                <Sidebar type={PAGE_TYPE} deviceType={deviceType} />
              </SidebarSection>
              <ContentSection>
                <div ref={targetRef}>
                  <Products
                    type={PAGE_TYPE}
                    deviceType={deviceType}
                    fetchLimit={16}
                  />
                </div>
              </ContentSection>
            </MainContentArea>
          </>
        ) : (
          <MainContentArea>
            <Sidebar type={PAGE_TYPE} deviceType={deviceType} />
            <ContentSection style={{ width: "100%" }}>
              <Products
                type={PAGE_TYPE}
                deviceType={deviceType}
                fetchLimit={16}
              />
            </ContentSection>
          </MainContentArea>
        )}
        <CartPopUp deviceType={deviceType} />
      </Modal>
    </>
  );
}

export default withApollo(Library);
