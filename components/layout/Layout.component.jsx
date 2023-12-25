import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { UserContext } from "@/services/userContext";
import TopAppBar from "../TopAppBar";

export const Layout = ({ children }) => {
  const { user, logout, loading } = useContext(UserContext);
  const router = useRouter();

  if (loading)
    return (
      <div className="loadingScreen">
        <div className="loader"></div>
      </div>
    );

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
