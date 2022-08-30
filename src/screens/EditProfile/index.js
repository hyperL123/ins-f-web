import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useUser, { ME_QUERY } from "../../hooks/useUser";
import Avatar from "../../shared-components/Avatar";

const EDIT_PROFILE_MUTATION = gql`
  mutation (
    $firstName: String
    $lastName: String
    $userName: String
    $bio: String
  ) {
    editProfile(
      firstName: $firstName
      lastName: $lastName
      userName: $userName
      bio: $bio
    ) {
      ok
      error
      id
    }
  }
`;
const EDIT_PROFILE_AVATAR_MUTATION = gql`
  mutation ($avatar: Upload) {
    editProfile(avatar: $avatar) {
      ok
      error
      id
    }
  }
`;

const EditProfile = () => {
  const [editProfile, { loading }] = useMutation(EDIT_PROFILE_MUTATION, {});
  const [editAvatar] = useMutation(EDIT_PROFILE_AVATAR_MUTATION);
  const { userName } = useParams();
  console.log(userName);
  const { data: userData } = useUser();
  console.log(userData?.me?.userName === userName);
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    setIsUser(userData?.me?.userName === userName);
  }, []);
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });

  const onSubmitValid = () => {
    const [newFirstName, newUserName, newBio] = getValues([
      "firstname",
      "username",
      "bio",
    ]);
    if (loading) {
      return;
    }
    editProfile({
      variables: {
        firstName: newFirstName,
        userName: newUserName,
        bio: newBio,
      },
    });
  };

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/svg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "image/tiff"
    ) {
      editAvatar({
        variables: {
          avatar: selectedFile,
        },
        refetchQueries: () => [{ query: ME_QUERY }],
      });

      console.log("Ok picture");
    } else {
      console.log("NOT Ok Picture");
    }
  };

  if (isUser)
    return (
      <div className="flex w-full flex-row justify-between border bg-[#FAFAFAFA] p-3">
        <div className="w-1/3 border">
          <div className="TheList flex flex-col items-start bg-white [&_div]:w-full [&_div]:py-2 [&_div]:px-3">
            <div>Edit Profile</div>
            <div className="hover:bg-[#FAFAFAFA]">Change password</div>
            <div className="hover:bg-[#FAFAFAFA]">Apps and websites</div>
            <div className="hover:bg-[#FAFAFAFA]">Email notications</div>
            <div className="hover:bg-[#FAFAFAFA]">Push notification</div>
            <div className="hover:bg-[#FAFAFAFA]">Manage contacts</div>
            <div className="hover:bg-[#FAFAFAFA]">Privacy and sercurity</div>
            <div className="hover:bg-[#FAFAFAFA]">Supervision</div>
            <div className="hover:bg-[#FAFAFAFA]">Login activity</div>
            <div className="hover:bg-[#FAFAFAFA]">Emails from Instagram</div>
            <div className="hover:bg-[#FAFAFAFA]">Help</div>
          </div>
        </div>
        <form className="flex w-2/3 flex-col border bg-white">
          <div className="my-3 flex w-full flex-row items-center justify-center">
            <div className="flex w-1/3 justify-end">
              <Avatar className="" url={userData?.me?.avatar} />
            </div>

            <div className="flex w-2/3 flex-col ">
              <div className="">{userName}</div>
              <div className="">
                <label
                  htmlFor="profilePhotoUpdate"
                  className="rounded-lg bg-blue-500  font-semibold text-white"
                >
                  Change profile photo
                </label>
                <input
                  type="file"
                  id="profilePhotoUpdate"
                  className="hidden"
                  onChange={uploadImage}
                ></input>
              </div>
            </div>
          </div>
          <div className="my-3 mr-6 flex w-full flex-row justify-center">
            <div className="w-1/3 text-end font-medium">Name</div>
            <input
              {...register("firstname", {
                required: "Please enter your firstname",
              })}
              className="w-2/3 border-2"
              placeholder={userData?.me?.firstName}
              type="text"
            ></input>
          </div>
          <div className="my-3 mr-6 flex w-full flex-row justify-center">
            <div className="w-1/3 text-end font-medium">Username</div>
            <input
              {...register("username", {
                required: "Please enter your firstname",
              })}
              className="w-2/3 border-2"
              placeholder={userData?.me?.userName}
              type="text"
            ></input>
          </div>
          <div className="my-3 mr-6 flex w-full flex-row justify-center">
            <div className="w-1/3 text-end font-medium">Bio</div>
            <input
              {...register("bio", {
                required: "Please enter your firstname",
              })}
              className="w-2/3 border-2"
              placeholder={userData?.me?.bio}
              type="text"
            ></input>
          </div>
        </form>
      </div>
    );
  return <div> Not The Login User </div>;
};

export default EditProfile;
