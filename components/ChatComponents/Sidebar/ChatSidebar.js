import { useState, useEffect } from "react";
import { Modal, Box, Avatar, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useStateValue } from "../../../context-api/StateProvider";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import Chat from "../Chat/Chat";
import { style } from "../../../styles/modalStyle";

const ChatSidebar = () => {
  const [{ user }] = useStateValue();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [chatRooms, setChatRooms] = useState([]);

  let username = user?.displayName.split(" ").join("").toLowerCase();

  // fetch chatRooms from firebase firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "chatRooms"), orderBy("timestamp", "asc")),
      (snapshot) => {
        setChatRooms(snapshot.docs);
      }
    );
    // trigger and unmount function
    return unsubscribe;
  }, []);

  // create a new chat room
  const handleNewChat = async (e) => {
    e.preventDefault();
    // add a new chat room into firebase firestore
    await addDoc(collection(db, "chatRooms"), {
      name: input,
      createdBy: user?.email,
      image: user?.photoURL,
      timestamp: serverTimestamp(),
    });
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
        onClick={() => setOpen(true)}
        className="bg-black font-extrabold text-white my-2 mx-5 p-2 hover:text-blue-500 "
      >
        Connect via Messages...
      </button>
      <div className="">
        {chatRooms.map((chat) => (
          <Chat
            key={chat.id}
            id={chat.id}
            chatName={chat.data().name}
            image={chat.data().image}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
