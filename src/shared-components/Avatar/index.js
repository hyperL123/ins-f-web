import { AiOutlineUser } from "react-icons/ai";

function Avatar({ url, size = "" }) {
  return (
    <>
      {url ? (
        <img
          src={url}
          className=" h-6 w-6 rounded-full ring-1 ring-blue-500"
          alt="avatar"
        />
      ) : (
        <AiOutlineUser
          size={"2rem"}
          className="rounded-full bg-gray-100 ring-1 ring-gray-300"
        />
      )}
    </>
  );
}

export default Avatar;
