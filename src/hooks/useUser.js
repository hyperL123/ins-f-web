import React, { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";
import { useQuery, useReactiveVar } from "@apollo/client/react";
import { gql } from "@apollo/client";

const ME_QUERY = gql`
  query {
    me {
      id
      avatar
      userName
      totalFollowing
    }
  }
`;
function useUser() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data, error } = useQuery(ME_QUERY, {
    skip: !isLoggedIn,
  });
  if (data?.me === null) {
    console.log("there is a token but token did not work on the backend");
    logUserOut();
  }

  return { data };
}

export default useUser;
