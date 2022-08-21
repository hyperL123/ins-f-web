import { gql, useMutation } from "@apollo/client";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import useUser from "../../../hooks/useUser";

const CREATE_COMMENT_MUTATION = gql`
  mutation ($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
      id
    }
  }
`;

function Comments({
  author,
  caption,
  commentNumber,
  comments,
  photoId,
  createdAt,
}) {
  console.log(comments, "COMMENTS ORGIN");
  const { data: userData } = useUser();
  const createCommentUpdate = (cache, result) => {
    const {
      data: {
        createComment: { ok, id },
      },
    } = result;
    console.log(comments, "In CreateaCOmment Update");

    if (ok && userData?.me) {
      const { payload } = getValues();
      const newComment = {
        __typename: "Comment",
        createdAt: Date.now() + "",
        id,
        isMine: true,
        payload,
        user: {
          ...userData.me,
        },
      };
      console.log(comments, "after new Comment");
      setValue("payload", "");
      console.log("Create COmment Update");
      const cacheData = cache.writeFragment({
        id: `Comment:${id}`,
        data: newComment,
        fragment: gql`
          fragment BSNAME on Comment {
            createdAt
            id
            isMine
            payload
            user {
              userName
              avatar
            }
          }
        `,
      });

      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          comments(prev) {
            return [...prev, cacheData];
          },
          commentsNumber(prev) {
            return prev + 1;
          },
        },
      });
      console.log(comments, "END");
    }
  };
  const [createaCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      update: createCommentUpdate,
    }
  );
  const { register, handleSubmit, setValue, getValues } = useForm();
  const onValid = (data) => {
    const { payload } = data;

    if (loading) {
      return;
    }
    createaCommentMutation({
      variables: {
        photoId,
        payload,
      },
    });
  };
  return (
    <div className="">
      <div className="flex flex-row items-center">
        <div className="text ml-5 mr-2 font-bold">{author}</div>
        <AiFillCheckCircle className="mx-1" fill="#0095f6" />
        <div className="text">
          {" "}
          {caption?.split(" ")?.map((word, index) =>
            /#[\w]+/.test(word) ? (
              <Fragment key={index}>
                <Link
                  className="cursor-pointer text-blue-800 hover:underline"
                  key={index}
                  to={`/hashtags/${word}`}
                >
                  {word}
                </Link>{" "}
              </Fragment>
            ) : (
              <Fragment key={index}>{word} </Fragment>
            )
          )}{" "}
        </div>
      </div>
      <div className="text my-1 ml-5 text-gray-400">
        {commentNumber === 1
          ? `View ${commentNumber} comment`
          : `View all ${commentNumber} comments`}
      </div>
      <div className="my-1 ml-5 text-xs text-gray-400">
        {Date(createdAt).split(" ")[1]}
        {"  "}
        {Date(createdAt).split(" ")[2]}
      </div>

      <div className="border-t text-xs">
        {comments?.map((comment) => {
          return <Comment comment={comment} photoId={photoId} />;
        })}
      </div>
      <div className=" flex flex-row items-center border-t p-3">
        <BsEmojiSmile className="ml-2 text-xl" />
        <div className="ml-2">
          <form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("payload", {
                required: "Please enter your comment",
                maxLength: {
                  value: 100,
                  message: "comment should be not longer than 100 charaters",
                },
              })}
              type="text"
              placeholder="Add a comment..."
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Comments;
