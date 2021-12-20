import { useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import { useStateValue } from "../context-api/StateProvider";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import Message from "../components/Message/Message";

const ChatScreen = () => {
  const [{ user }] = useStateValue();
  const [input, setInput] = useState("");

  return (
    <div className="h-full flex flex-col ">
      <div className="flex items-center px-3 py-2 border-b-2 border-black ">
        <Avatar />
        <div className="ml-5">
          <h4 className="font-bold text-sm">Zia Siddiqui</h4>
          <p className="text-xs">Last seen at 8:47 pm</p>
        </div>
        <IconButton className="ml-auto">
          <MoreVertIcon />
        </IconButton>
      </div>
      <div className="flex flex-1 p-3 flex-col overflow-y-scroll scrollbar-hide h-full">
        <Message sender />
        <Message />
        <Message sender />
        <Message />
        <Message sender />
        <Message />

        <Message sender />
        <Message />
        <Message sender />
        <Message />
        <Message sender />
        <Message />
      </div>
      <div className="flex items-center border-t-2 border-black p-2">
        <IconButton className="px-2">
          <SentimentSatisfiedOutlinedIcon fontSize="medium" />
        </IconButton>
        <input
          className="flex flex-1 outline-none h-10 text-md placeholder-gray-700  border-b-2 border-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Enter a message:  ${user?.displayName.toLowerCase()}`}
        />
        <IconButton>
          <SendOutlinedIcon fontSize="medium" />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatScreen;
