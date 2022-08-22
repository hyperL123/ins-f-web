import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center pb-10">
      <div className="mb-1 flex shrink-0 items-center justify-center">
        <a className="mx-2 text-gray-400">Meta</a>
        <a className="mx-2 text-gray-400">About</a>
        <a className="mx-2 text-gray-400">Blog</a>
        <a className="mx-2 text-gray-400">Jobs</a>
        <a className="mx-2 text-gray-400">Help</a>
        <a className="mx-2 hidden text-gray-400 sm:block">API</a>
        <a className="mx-2 hidden text-gray-400 sm:block">Privacy</a>
        <a className="mx-2 hidden text-gray-400 sm:block">Terms</a>
        <a className="mx-2 hidden text-gray-400 sm:block">Top Accounts</a>
        <a className="mx-2 hidden text-gray-400 sm:block">hashtags</a>
      </div>
      <div className="my-1 hidden shrink-0 items-center justify-center sm:block ">
        <a className="mx-2 text-gray-400">Locations</a>
        <a className="mx-2 text-gray-400">Instagram Lite</a>
        <a className="mx-2 text-gray-400">Contact Uploading & Non-Users</a>
      </div>
      <div className="my-1 flex  shrink-0 items-center justify-center">
        <a className="mx-2 text-gray-400">Dance</a>
        <a className="mx-2 text-gray-400">Food & drink</a>
        <a className="mx-2 hidden text-gray-400 sm:block">Home & garden</a>
        <a className="mx-2 hidden text-gray-400 sm:block">Music</a>
        <a className="mx-2 hidden text-gray-400 sm:block">Visual arts</a>
      </div>
      <div className="my-1 flex justify-center">
        <a className="mx-2 hidden text-gray-400 lg:block">English</a>
        <a className="mx-2 text-gray-400">© 2022 Instagram from Meta</a>
      </div>
    </div>
  );
};

export default Footer;
