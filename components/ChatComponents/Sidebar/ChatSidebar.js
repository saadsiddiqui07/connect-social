import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ChatSidebar = () => {
  return (
    <div className="flex flex-col bg-white h-full w-4/12">
      <div className="py-2 px-3 flex justify-between items-center bottom-3 border-b-2 border-gray-200">
        <p className="text-md font-bold font-mono">Your Chats</p>
        <MoreVertIcon />
      </div>
      <button className="bg-black font-extrabold text-white m-2 rounded-md p-2">
        Connect via Messages...
      </button>
    </div>
  );
};

export default ChatSidebar;
