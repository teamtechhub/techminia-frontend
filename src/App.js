import React from "react";
import { useMedia } from "utils/useMedia";
import { useDarkMode } from "utils/useDarkMode";
import { GlobalStyle } from "styles/global.style";
import { defaultTheme } from "theme/theme";
import BaseRouter from "routers/router";
import { useRouterQuery } from "utils/useRouterQuery";
import { ThemeProvider as OriginalThemeProvider } from "styled-components";
import { AuthProvider } from "contexts/auth/auth.provider";
// import { AppProvider } from "contexts/app/app.provider";
import { StickyProvider } from "contexts/app/app.provider";
import { SearchProvider } from "contexts/search/search.provider";
import { HeaderProvider } from "contexts/header/header.provider";
// import { useTimer } from "utils";
import Fade from "react-reveal/Fade";
import Firebase, { FirebaseContext } from "services/Firebase";
import { Provider as AlertProvider } from "react-alert"; //, withAlert } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alerts from "components/Alerts/Alerts";
// import { CartProvider } from "contexts/cart/use-cart";

import "typeface-dm-sans";
import "typeface-poppins";
// External CSS import here
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-phone-input-2/lib/style.css";
import "rc-drawer/assets/index.css";
import "rc-table/assets/index.css";
import "rc-collapse/assets/index.css";
import "react-multi-carousel/lib/styles.css";
import "@redq/reuse-modal/lib/index.css";
import "video-react/dist/video-react.css";

function App() {
  const queryParams = useRouterQuery();
  const [componentMounted] = useDarkMode();
  const mobile = useMedia("(max-width: 580px)");
  const tablet = useMedia("(max-width: 991px)");
  const desktop = useMedia("(min-width: 992px)");

  const alertOptions = {
    timeout: 5000,
    position: "top right",
    containerStyle: {
      top: "50px",
    },
  };

  if (!componentMounted) {
    return <div />;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // if (useTimer(7) > 0) {
  //   return <Intro style={{ position: "absolute", zIndex: "1008" }} />;
  // }
  const query = queryParams.get("text") ? queryParams.get("text") : "";
  return (
    <Fade clear duration={800}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <OriginalThemeProvider theme={defaultTheme}>
          <Alerts />
          <FirebaseContext.Provider value={new Firebase()}>
            <SearchProvider query={query}>
              {/* <CartProvider> */}
                {/* <AppProvider> */}
                <HeaderProvider>
                  <AuthProvider>
                    <StickyProvider>
                      <BaseRouter deviceType={{ mobile, tablet, desktop }} />
                    </StickyProvider>
                  </AuthProvider>
                </HeaderProvider>
                {/* </AppProvider> */}
              {/* </CartProvider> */}
              <GlobalStyle />
            </SearchProvider>
          </FirebaseContext.Provider>
        </OriginalThemeProvider>
      </AlertProvider>
    </Fade>
  );
}

export default App;
