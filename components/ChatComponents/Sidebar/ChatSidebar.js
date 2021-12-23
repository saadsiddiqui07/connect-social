import { useState } from "react";
import { Modal, Box, Avatar, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useStateValue } from "../../../context-api/StateProvider";
import Chat from "../Chat/Chat";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid lightgray",
  boxShadow: 24,
  p: 2,
  borderRadius: 2,
};

const ChatSidebar = () => {
  const [{ user }] = useStateValue();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  let username = user?.displayName.split(" ").join("").toLowerCase();

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleNewChat = (e) => {
    e.preventDefault();
    setOpen(false);
    setInput("");
  };

  return (
    <div className="flex flex-col bg-gray-50 h-full w-4/12">
      <Modal className="w-full" open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <h4 className="text-center font-sans">Start a conversation</h4>
          <div className="flex items-center px-2 py-2">
            <Avatar
              className="h-10 object-contain rounded-full mr-2"
              src={user?.photoURL}
              alt="img"
            />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent flex-1 ml-2 text-black text-sm border-1 border-b-2 outline-none"
              placeholder="Enter email or username..."
            />
          </div>

          <Button
            disabled={!input}
            onClick={handleNewChat}
            color="secondary"
            size="small"
            variant="contained"
            className="flex ml-auto mr-auto"
          >
            Add Chat
          </Button>
        </Box>
      </Modal>
      <div className="py-2 px-3 flex justify-between items-center bottom-3 border-b-2 border-gray-200">
        <p className="text-md font-bold font-mono">{username}</p>
        <MoreVertIcon />
      </div>
      <button
        onClick={handleModalOpen}
        className="bg-black font-extrabold text-white my-2 mx-5 p-2 hover:text-blue-500 "
      >
        Connect via Messages...
      </button>
      <div className="">
        <Chat />
        <Chat />
        <Chat />
        <Chat />
      </div>
    </div>
  );
};

export default ChatSidebar;
