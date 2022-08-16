import { BsBookmark, BsHeart, BsHeartFill } from "react-icons/bs";
import { BiComment } from "react-icons/bi";

import { FiSend } from "react-icons/fi";
import { gql, useMutation } from "@apollo/client";
import { comment } from "postcss";
import Comments from "./Comments";
import { Link } from "react-router-dom";
import Avatar from "../../../share-components/Avatar"
const TOGGLE_LIKE_MUTATION = gql`
  mutation ($toggleLikeId: Int!) {
    toggleLike(id: $toggleLikeId) {
      ok
      error
    }
  }
`;

function Photo({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  commentNumber,
  comments,
  createdAt,
}) {
  const updateToggleLike = (cache, result) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    if (ok) {
      console.log("now it is ture");
      cache.writeFragment({
        id: `Photo:${id}`,
        fragment: gql`
          fragment BSNAME on Photo {
            isLiked
            likes
          }
        `,
        data: {
          isLiked: !isLiked,
          likes: isLiked ? likes - 1 : likes + 1,
        },
      });
    }
  };
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      toggleLikeId: id,
    },
    update: updateToggleLike,
  });
  return (
    <div
      key={id}
      className="mb-6 flex max-w-2.5xl flex-col rounded-md border bg-white"
    >
      <div className="flex items-center p-4">
        <div className="mx-1">
          <Link to={`/users/${user?.userName}`}>
            <Avatar url={user?.avatar} />
          </Link>
        </div>
        <Link to={`/users/${user?.userName}`}>
          <div className="ml-3 font-medium">{user?.userName}</div>
        </Link>
      </div>
      <div className="items-center justify-center border-y">
        <img className="object-contain" src={file} />
      </div>
      <div className="PhotoData ">
        <div className="BANNER mt-5 flex flex-row justify-between px-5">
          <div className="flex flex-row items-center">
            <div className="cursor-pointer" onClick={toggleLikeMutation}>
              {!isLiked ? (
                <BsHeart className="mr-6 text-3xl" />
              ) : (
                <BsHeartFill className="mr-6 text-3xl" fill="#FF6347" />
              )}
            </div>
            <BiComment className="mr-6 text-4xl" />
            <FiSend className="mr-6 text-4xl" />
          </div>
          <div className="flex items-center">
            <BsBookmark className="text-3xl" />
          </div>
        </div>
      </div>
      <div className="LIKE px-5 pt-4  pb-3 font-bold">
        {likes === 1 ? `${likes} like` : `${likes} likes`}
      </div>
      <Comments
        author={user.userName}
        caption={caption}
        comments={comments}
        createdAt={createdAt}
        commentNumber={commentNumber}
        photoId={id}
      />
    </div>
  );
}

export default Photo;
