import React from "react";
import { useRouter } from "next/router";
import { Avatar } from "@mui/material";
import { useStateValue } from "../../../context-api/StateProvider";
import { truncateText } from "../../../utils/truncateText";

const Chat = () => {
  const [{ user }] = useStateValue();
  const router = useRouter();

  let message = "Heyy i am using connect message and also testing a function";

  const handleOpenChat = () => {
    router.push(`/chat/1`);
  };

  return (
    <div
      onClick={handleOpenChat}
      className="flex cursor-pointer items-center m-2 px-2 py-2 bg-gray-500 hover:bg-black text-white transition-opacity "
    >
      <Avatar className="h-9 w-9" src={user?.photoURL} />
      <div className="ml-3">
        <h4 className="font-bold text-sm">My Username</h4>
        <p className="text-xs">{truncateText(message, 42)}</p>
      </div>
    </div>
  );
};

export default Chat;
