import { BsBookmark, BsHeart, BsHeartFill } from "react-icons/bs";
import { BiComment } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import { gql, useMutation } from "@apollo/client";
import Comments from "./Comments";
import { Link } from "react-router-dom";
import Avatar from "../../../shared-components/Avatar";

import { useState } from "react";
import { showVar } from "../../../apollo";
const TOGGLE_LIKE_MUTATION = gql`
  mutation ($toggleLikeId: Int!) {
    toggleLike(id: $toggleLikeId) {
      ok
      error
    }
  }
`;

const DELETE_PHOTO_MUTATION = gql`
  mutation ($deletePhotoId: Int!) {
    deletePhoto(id: $deletePhotoId) {
      ok
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

  const updateDeletePhoto = (cache, result) => {
    const {
      data: {
        deletePhoto: { ok },
      },
    } = result;
    if (ok) {
      cache.evict({ id: `Photo:${id}` });
    }
    waitThreeSec();
  };

  const [deletePhotoMutation] = useMutation(DELETE_PHOTO_MUTATION, {
    variables: {
      deletePhotoId: id,
    },
    update: updateDeletePhoto,
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const waitThreeSec = () => {
    showVar(true);
    setTimeout(() => {
      showVar(false);
    }, 3000);
  };

  return (
    <div
      key={id}
      className="mb-6 flex max-w-2.5xl flex-col rounded-md border bg-white"
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center ">
          <div className="mx-1">
            <Link to={`/users/${user?.userName}`}>
              <Avatar url={user?.avatar} />
            </Link>
          </div>
          <Link to={`/users/${user?.userName}`}>
            <div className="ml-3 font-medium">{user?.userName}</div>
          </Link>
        </div>
        <div>
          <button
            className="py-3 px-2 font-bold  "
            type="button"
            onClick={() => {
              setShowDeleteModal(true);
            }}
          >
            <MdDeleteOutline className="text-xl" />
          </button>
        </div>
      </div>
      <div className="items-center justify-center border-y">
        <img className="object-contain" src={file} alt="Post" />
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
            <BiComment className="mr-6 text-4xl text-gray-200" />
            <FiSend className="mr-6 text-4xl text-gray-200" />
          </div>
          <div className="flex items-center">
            <BsBookmark className="text-3xl text-gray-200" />
          </div>
        </div>
      </div>
      {likes !== 0 && (
        <div className="LIKE px-5 pt-4  pb-3 font-bold">
          {likes === 1 ? `${likes} like` : `${likes} likes`}
        </div>
      )}

      <Comments
        author={user.userName}
        caption={caption}
        comments={comments}
        createdAt={createdAt}
        commentNumber={commentNumber}
        photoId={id}
      />
      {/* Delete Modal */}
      <>
        {showDeleteModal ? (
          <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
              <div className="relative my-6 mx-auto w-auto max-w-xl">
                {/*content*/}
                <div className="relative flex w-full flex-col rounded-xl border-0 bg-white shadow-lg outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex flex-col items-center justify-center rounded-t p-1">
                    <h3 className="mt-12 text-3xl font-bold">Delete post?</h3>
                    <div className="my-4 flex flex-col items-center justify-center py-6 px-11 text-2xl  text-slate-400">
                      <p>Are you sure you want to </p>
                      <p>delete this post?</p>
                    </div>
                  </div>
                  <div className="flex flex-col rounded-b ">
                    <button
                      className="background-transparent border-t-2 border-solid border-slate-200 p-5 text-xl font-bold uppercase text-red-500"
                      type="button"
                      onClick={() => {
                        setShowDeleteModal(false);
                        console.log(id);
                        deletePhotoMutation();
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="text rounded  border-t-2 border-solid border-slate-200 p-5 text-xl font-bold uppercase"
                      type="button"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
          </>
        ) : null}
      </>
    </div>
  );
}

export default Photo;
