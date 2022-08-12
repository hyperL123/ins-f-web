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
    }
  }
`;
function useUser() {
  console.log("inside the useUser");
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  console.log("isLoggedIn:", isLoggedIn);
  const { data, error } = useQuery(ME_QUERY, {
    skip: !isLoggedIn,
  });

  useEffect(() => {
    console.log(data);
    if (data?.me === null) {
      console.log("there is a token but token did not work on the backend");
      logUserOut();
    }
  }, [data]);

  console.log(data);
  return { data };
}

export default useUser;
