import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { UserContext } from "@/services/userContext";
import TopAppBar from "../TopAppBar";

export const Layout = ({ children }) => {
  const { user, logout, loading } = useContext(UserContext);
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);

  const handleRouteChange = () => {
    setPageLoading(true);
  };

  const handleRouteChangeComplete = () => {
    setPageLoading(false);
  };

  router?.events?.on("routeChangeStart", handleRouteChange);
  router?.events?.on("routeChangeComplete", handleRouteChangeComplete);

  if (loading || pageLoading)
    return (
      <div className="loadingScreen">
        <div className="loader"></div>
      </div>
    );

  if (!!user && router.pathname === "/login") {
    router.push("/");
  }

  if (!user && !loading) return <div>{children}</div>;
  if (user) {
    return (
      <div id="main">
        {user ? (
          <>
            <div
              style={{
                marginTop: "40px",
              }}
              className="rightContainer"
            >
              {children}
            </div>
            <TopAppBar />
          </>
        ) : (
          ""
        )}

        <div style={{}}></div>
      </div>
    );
  }
};
