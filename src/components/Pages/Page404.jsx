import React from "react";
import { useLocation } from "react-router";

const Page404 = () => {

  return (
    <>
      <h2 className="pt-5">Error 404 page not found</h2>
      <h5 className="pt-3">
        Not match for <code>{useLocation().pathname}</code>
      </h5>
    </>
  );
}

export default Page404