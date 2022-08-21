import { AiOutlineUser } from "react-icons/ai";

function Avatar({ url = "", size = "w-8 h-8" }) {
  const AVATAR_CSS = `${size} rounded-full border`;
  return (
    <>
      {url !== "" ? (
        <img className={AVATAR_CSS} alt="avatar" src={url} />
      ) : (
        <AiOutlineUser />
      )}
    </>
  );
}

export default Avatar;
