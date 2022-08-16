import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";

const SEE_PROFILE_QUERY = gql`
  query ($userName: String) {
    seeProfile(userName: $userName) {
      id
      firstName
      lastName
      userName
      bio
      avatar
      totalFollowing
      totalFollowers
      isMe
      isFollowing
      photos {
        id
        file
        likes
        commentNumber
        isLiked
      }
    }
  }
`;

const Profile = () => {
  const { userName } = useParams();
  const { data } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      userName,
    },
  });
  return (
    <div className="flex flex-col">
      <div className="flex border-b p-6">
        <img
          className="mx-5 h-40 w-40 rounded-full border "
          alt="avatar"
          src={data?.seeProfile?.avatar}
        />
        <div className="profileInfo ml-8 flex flex-col p-1">
          <div className="NameMssageFollow mb-4 text-3xl font-light">
            leonhuang1111
          </div>
          <div className="PostFollowersFollowing mb-5  flex">
            <div className="mr-6">0 post</div>
            <div className="mr-6">1 follower</div>
            <div className="mr-6">1 following</div>
          </div>
          <div className="BIO font-bold">BIO</div>
        </div>
      </div>
      <div>Picture</div>
    </div>
  );
};

export default Profile;
