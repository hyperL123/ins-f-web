import { gql, useQuery } from "@apollo/client";
import React from "react";

import { PHOTO_FRAGMENT, COMMENT_FRAGMENT } from "../../gql-fragment/fragments";
import Photo from "./components/Photo";
import HeaderTitle from "../../shared-components/HeaderTitle";

export const FEED_QUERY = gql`
  query {
    seeFeed {
      ...PhotoFragment
      user {
        userName
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      
      
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

const Home = () => {
  console.log(FEED_QUERY);
  const { data } = useQuery(FEED_QUERY);
  console.log(data);
  return (
    <div className="my-7 flex w-full flex-col items-center">
      <HeaderTitle title="Home" />
      {data?.seeFeed?.map((photo) => (
        <Photo {...photo} key={photo.id} />
      ))}
    </div>
  );
};
export default Home;
