import React from "react";
import { useRouter } from "next/router";
import { Avatar } from "@mui/material";
import { useStateValue } from "../../../context-api/StateProvider";
import { truncateText } from "../../../utils/truncateText";

const Chat = ({ id, chatName }) => {
  const [{ user }] = useStateValue();
  const router = useRouter();

  let message = "Heyy i am using connect message and also testing a function";

  const handleOpenChat = () => {
    router.push(`/messages/${id}`);
  };

  return (
    <div
      id={id}
      onClick={handleOpenChat}
      className="flex cursor-pointer items-center px-2 py-2 border-b-[1px] border-gray-400 hover:bg-gray-200 text-white transition-opacity "
    >
      <Avatar className="h-9 w-9" src={user?.photoURL} />
      <div className="ml-3">
        <h4 className="font-bold text-sm text-black">{chatName}</h4>
        <p className="text-xs text-black">{truncateText(message, 42)}</p>
      </div>
    </div>
  );
};

export default Chat;
