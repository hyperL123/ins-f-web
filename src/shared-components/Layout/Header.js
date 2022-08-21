import React, { useState, useRef, useEffect } from "react";
import { AiFillInstagram, AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import {
  BsPerson,
  BsBookmark,
  BsExclamationCircle,
  BsLayersHalf,
} from "react-icons/bs";
import { FcPicture } from "react-icons/fc";
import { CgAddR } from "react-icons/cg";

import { MdOutlineArrowBack } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { RiNavigationLine } from "react-icons/ri";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { isLoggedInVar, logUserOut } from "../../apollo";
import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import Logo from "../Logo";
import Avatar from "../Avatar";

const UPLOAD_PHOTO_MUTATION = gql`
  mutation ($fileImage: Upload!, $caption: String) {
    uploadPhoto(file: $fileImage, caption: $caption) {
      id
    }
  }
`;

const Header = () => {
  const ref = useRef();
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState();
  const [uploadPhotoMutation, { loading, error }] = useMutation(
    UPLOAD_PHOTO_MUTATION,
    {
      variables: {
        fileImage: file,
        caption,
      },
      // update: updateToggleLike,
    }
  );

  const uploadPostData = () => {
    // 👇️ update textarea value
    console.log("Share");
    console.log(caption);
    uploadPhotoMutation();
    setPreviewPicture(false);
  };
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleCreateNewPost, setToggleCreateNewPost] = useState(false);
  const [previewPicture, setPreviewPicture] = useState(false);

  const [wrongImageType, setWrongImageType] = useState(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  console.log("inside the Header islogin", isLoggedIn);
  const { data } = useUser();
  const buttonCss = `rounded-md px-4 py-15 text-white font-semibold`;
  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/svg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "image/tiff"
    ) {
      setFile(selectedFile);
      setToggleCreateNewPost(false);
      setPreviewPicture(true);
      setWrongImageType(false);
    } else {
      setWrongImageType(true);
    }
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        toggleCreateNewPost &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        setWrongImageType(false);
        setToggleCreateNewPost(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [toggleCreateNewPost]);
  if (error)
    return (
      <div>
        <div>{typeof file}</div>
        {JSON.stringify(error, null, 2)}
      </div>
    );
  return (
    <div className="flex w-full justify-between border-b bg-[#FFFFFF] p-5">
      <div>
        <Logo size={"text-3xl"} />
      </div>

      {isLoggedIn ? (
        <div className=" flex flex-row items-center">
          <Link className="" to="/">
            <AiOutlineHome className="ml-4" size={"2rem"} />
          </Link>
          <button onClick={() => setToggleCreateNewPost(true)}>
            <CgAddR className="ml-4" size={"2rem"} />
          </button>

          <RiNavigationLine className="ml-4" size={"2rem"} />
          <div className="relative inline-block">
            {/* <Link className="ml-4" to={`/users/${data?.me?.userName}`}> */}

            {data?.me?.avatar ? (
              <button
                className="ml-3 p-1"
                onClick={() => setToggleMenu(!toggleMenu)}
              >
                <Avatar url={data?.me?.avatar} />
              </button>
            ) : (
              <button onClick={() => setToggleMenu(!toggleMenu)}>
                <BsPerson className="text-3xl" />
              </button>
            )}

            {/* </Link> */}

            {toggleMenu && (
              <div className="absolute right-0 mt-2 flex w-64 origin-top-right  flex-col justify-start bg-white p-2 shadow">
                <Link className="" to={`/users/${data?.me?.userName}`}>
                  <div className=" flex flex-row items-center justify-start py-3 pl-2 text-lg">
                    <BsPerson className="mr-2" />
                    <div>Profile</div>
                  </div>
                </Link>
                <button>
                  <div className=" flex flex-row items-center justify-start py-3 pl-2 text-lg">
                    <BsBookmark className="mr-2" />
                    <div className="text-gray-200">Saved X</div>
                  </div>
                </button>
                <button>
                  <div className="flex flex-row items-center justify-start py-3 pl-2 text-lg">
                    <FiSettings className="mr-2" />
                    <div className="text-gray-200">Settings X</div>
                  </div>
                </button>
                <button>
                  <div className=" flex flex-row items-center  py-3 pl-2 text-lg">
                    <HiOutlineSwitchHorizontal className="mr-2" />
                    <div className="text-gray-200">Switch acounts X</div>
                  </div>
                </button>
                <button onClick={() => logUserOut()}>
                  <div className=" flex flex-row items-center border-t-2 border-gray-200  py-3 pl-2 text-lg">
                    <div className="ml-2">Log Out</div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="m-x-3 flex">
          <Link to="/login">
            <button className={buttonCss}>Log in</button>
          </Link>
        </div>
      )}
      <>
        {toggleCreateNewPost && (
          <>
            <div className="fixed inset-0 z-50 flex items-center justify-center  overflow-y-auto overflow-x-hidden bg-zinc-800/80 outline-none focus:outline-none">
              <div
                className="relative my-6 mx-auto w-auto max-w-4xl "
                ref={ref}
              >
                {/*content*/}
                <div className="relative flex w-full flex-col rounded-xl border-2 bg-white shadow-lg outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex flex-col items-center justify-center rounded-t p-1">
                    <h3 className="border-b-2 px-48 py-4 text-2xl font-semibold">
                      Create new post
                    </h3>
                  </div>
                  <div className="flex flex-col items-center justify-center py-32">
                    {wrongImageType ? (
                      <BsExclamationCircle
                        size={"10rem"}
                        className="font-extralight"
                      />
                    ) : (
                      <FcPicture size={"10rem"} className="font-extralight" />
                    )}
                    {wrongImageType ? (
                      <div className="mb-8 p-2 text-3xl font-light">
                        This file is not supported{" "}
                      </div>
                    ) : (
                      <div className="mb-8 p-2 text-3xl font-light">
                        Drag photos and videos here{" "}
                      </div>
                    )}
                    <label
                      htmlFor="imageUpdate"
                      className="rounded-lg bg-blue-500 px-3 py-2 font-semibold text-white"
                    >
                      Select from computer
                    </label>
                    <input
                      type="file"
                      id="imageUpdate"
                      className="hidden"
                      onChange={uploadImage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
      <>
        {previewPicture && (
          <>
            <div className="fixed inset-0 z-50  flex  items-center justify-center bg-zinc-800/80 p-10">
              <div className="flex w-full shrink-0  flex-col rounded-xl border-2 bg-white shadow-lg ">
                {/*header*/}
                <div className="flex flex-row items-center justify-between px-2 py-2">
                  <button
                    onClick={() => {
                      setPreviewPicture(false);
                      setToggleCreateNewPost(true);
                      setWrongImageType(false);
                    }}
                  >
                    <MdOutlineArrowBack
                      size={"2rem"}
                      className="font-extralight"
                    />
                  </button>
                  <h3 className="flex text-2xl font-semibold">
                    Create new post
                  </h3>
                  <button
                    className="px-2 text-blue-600"
                    onClick={() => uploadPostData()}
                  >
                    Share
                  </button>
                </div>

                <div className="grid grid-cols-2 border-t-2">
                  <img
                    src={URL.createObjectURL(file)}
                    className="h-auto w-full"
                    alt="Thumb"
                  />
                  <div className="flex flex-col ">
                    <div className="flex flex-row p-4 ">
                      <div className="">
                        <Avatar url={data?.me?.avatar} />
                      </div>
                      <div>{data?.me?.userName}</div>
                    </div>
                    <div className="mx-2 w-full p-3">
                      <textarea
                        aria-label="Write a caption..."
                        placeholder="Write a caption..."
                        autoComplete="off"
                        autoCorrect="off"
                        className="h-48 w-full "
                        maxLength="2000"
                        onChange={(e) => {
                          setCaption(e.target.value);
                        }}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default Header;
