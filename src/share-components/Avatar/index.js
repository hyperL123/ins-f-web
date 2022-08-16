import { AiOutlineUser } from "react-icons/ai";

function Avatar({ url = "", size = "w-10 h-10" }) {
  const AVATAR_CSS = `${size} rounded-full border`;
  return (
    <div className="flex">
      {url !== "" ? (
        <img className={AVATAR_CSS} alt="avatar" src={url} />
      ) : (
        <AiOutlineUser />
      )}
    </div>
  );
}

export default Avatar;
