import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import useUser from "../../hooks/useUser";
import HeaderTitle from "../../shared-components/HeaderTitle";

const FOLLOW_USER_MUTATION = gql`
  mutation ($userName: String!) {
    followUser(userName: $userName) {
      ok
    }
  }
`;
const UNFOLLOW_USER_MUTATION = gql`
  mutation ($userName: String!) {
    unfollowUser(userName: $userName) {
      ok
    }
  }
`;

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
  const { data: userData } = useUser();
  const { data } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      userName,
    },
  });
  const unfollowUserUpdate = (cache, result) => {
    const {
      data: {
        unfollowUser: { ok },
      },
    } = result;
    if (!ok) return;
    cache.modify({
      id: `User:${userName}`,
      fields: {
        isFollowing(prev) {
          return false;
        },
        totalFollowers(prev) {
          return prev - 1;
        },
      },
    });
    const { me } = userData;
    cache.modify({
      id: `User:${me.userName}`,
      fields: {
        totalFollowing(prev) {
          return prev - 1;
        },
      },
    });
  };
  const [unfollowUser] = useMutation(UNFOLLOW_USER_MUTATION, {
    variables: {
      userName,
    },
    update: unfollowUserUpdate,
  });
  const followUserUpdate = (cache, result) => {
    const {
      data: {
        followUser: { ok },
      },
    } = result;
    if (!ok) return;
    cache.modify({
      id: `User:${userName}`,
      fields: {
        isFollowing(prev) {
          return true;
        },
        totalFollowers(prev) {
          return prev + 1;
        },
      },
    });
    const { me } = userData;
    cache.modify({
      id: `User:${me.userName}`,
      fields: {
        totalFollowing(prev) {
          return prev + 1;
        },
      },
    });
  };
  const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
    variables: {
      userName,
    },
    update: followUserUpdate,
  });
  const buttonSelecter = (seeProfile) => {
    console.log(seeProfile?.isFollowing, "isfollowing");
    if (seeProfile?.isMe) return <button>Edit Profile</button>;
    if (seeProfile?.isFollowing) {
      return <button onClick={unfollowUser}>Unfollow</button>;
    } else {
      return <button onClick={followUser}>Follow</button>;
    }
  };
  return (
    <div className="flex flex-col">
      {!data?.seeProfile && <div>USER Not FOUND</div>}
      <HeaderTitle title={"Profile"} />
      <div className="flex border-b p-6">
        <img
          className="mx-5 h-40 w-40 rounded-full border "
          alt="avatar"
          src={data?.seeProfile?.avatar}
        />
        <div className="profileInfo ml-8 flex flex-col p-1">
          <div className="NameMssageFollow mb-4 text-3xl font-light">
            {data?.seeProfile?.userName}
          </div>
          {buttonSelecter(data?.seeProfile)}
          <div className="PostFollowersFollowing mb-5  flex">
            <div className="mr-6">0 post</div>
            <div className="mr-6">
              {data?.seeProfile?.totalFollowers} follower
            </div>
            <div className="mr-6">
              {data?.seeProfile?.totalFollowing} following
            </div>
          </div>
          <div className="BIO font-bold">BIO</div>
        </div>
      </div>
      <div>Picture</div>
    </div>
  );
};

export default Profile;
