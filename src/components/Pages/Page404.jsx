import React from "react";
import {Redirect, useLocation} from "react-router";

const Page404 = () => {

  let pathname = useLocation().pathname;
  const privatePaths = [
    '/finder',
    '/settings',
    '/saved-record',
    '/add-record',
    '/signed-records',
    '/records-to-sign',
    '/logout'
  ]

  if (privatePaths.includes(pathname)){
    return <Redirect to={'/login'} />
  }

  return (
    <>
      <h2 className="pt-5">Error 404 page not found</h2>
      <h5 className="pt-3">
        Not match for <code>{pathname}</code>
      </h5>
    </>
  );
}

export default Page404