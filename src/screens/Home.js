import { gql, useQuery } from "@apollo/client";
import React from "react";
import { isLoggedInVar, logUserOut } from "../apollo";
import Avatar from "../uilities/Avatar";
const FEED_QUERY = gql`
  query {
    seeFeed {
      id
      user {
        userName
        avatar
      }
      file
      caption
      likes
      comments
      createdAt
      isMine
    }
  }
`;

const Home = () => {
  const { data } = useQuery(FEED_QUERY);
  console.log(data);
  return (
    <>
      {data?.seeFeed?.map((photo) => (
        <div key={photo.id}>
          <div>
            <Avatar url={photo.user.avatar} />
            <div className="font-semibold">{photo.user.userName}</div>
          </div>
        </div>
      ))}
      <button onClick={() => logUserOut()}>Log Out Now!</button>
    </>
  );
};
export default Home;
