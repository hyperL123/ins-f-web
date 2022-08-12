import { AiOutlineUser } from "react-icons/ai";

const AvatarCss = `flex justify-center items-center  h-8 w-8   rounded-full bg-black overflow-hidden`;

const Img = `max-w-full `;

function Avatar({ url = "" }) {
  return (
    <div className={AvatarCss}>
      {url !== "" ? (
        <img className={Img} alt="avatar" src={url} />
      ) : (
        <AiOutlineUser />
      )}
    </div>
  );
}

export default Avatar;
