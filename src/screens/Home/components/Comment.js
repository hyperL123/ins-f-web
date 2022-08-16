import { gql, useMutation } from "@apollo/client";
import { comment } from "postcss";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { TiDeleteOutline } from "react-icons/ti";
const DELETE_COMMENT_MUTATION = gql`
  mutation ($deleteCommentId: Int!) {
    deleteComment(id: $deleteCommentId) {
      ok
    }
  }
`;

function Comment({ comment, photoId }) {
  console.log(comment);
  const updateDeleteComment = (cache, result) => {
    const {
      data: {
        deleteComment: { ok, error },
      },
    } = result;
    if (ok) {
      cache.evict({ id: `Comment:${comment.id}` });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentNumber(prev) {
            return prev - 1;
          },
        },
      });
    }
  };
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    update: updateDeleteComment,
  });
  const onDeleteClick = () => {
    deleteCommentMutation({
      variables: {
        deleteCommentId: comment.id,
      },
    });
  };
  return (
    <div key={comment.id}>
      <div className="ml-5 flex flex-row">
        <Link to={`/users/${comment?.user?.userName}`}>
          <div className="mr-2 font-bold">{comment.user.userName}</div>
        </Link>
        <div>
          {comment.payload?.split(" ").map((word, index) =>
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
        {comment.isMine && (
          <button onClick={onDeleteClick}>
            <TiDeleteOutline />
          </button>
        )}
      </div>
    </div>
  );
}

export default Comment;
