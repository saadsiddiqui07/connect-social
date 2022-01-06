import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useStateValue } from "../context-api/StateProvider";
import { Avatar, IconButton, MenuItem, Menu } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import Message from "../components/Message/Message";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  doc,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const ChatScreen = () => {
  const [{ user }] = useStateValue();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const endOfMessageRef = useRef(null);
  const router = useRouter();
  const roomId = router.query.id;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // fetch room info with --> roomId
  useEffect(() => {
    if (roomId) {
      onSnapshot(doc(db, "chatRooms", roomId), (snapshot) => {
        // set room name
        setRoomName(snapshot.data().name);
        // fetch messages of a specific chatRoom using roomId
      });
      onSnapshot(
        query(
          collection(db, "chatRooms", roomId, "messages"),
          orderBy("timestamp", "asc")
        ),
        (snapshot) => {
          setMessages(snapshot.docs);
        }
      );
    }
  }, [roomId]);

  // add scroll animation at the end of the message
  const ScrollToBottom = () => {
    endOfMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  // send message function
  const sendMessage = async (e) => {
    e.preventDefault();
    // add message into a specific chat room using --> chatId
    await addDoc(collection(db, "chatRooms", roomId, "messages"), {
      message: input,
      username: user?.displayName.split(" ").join("").toLowerCase(),
      email: user?.email,
      timestamp: serverTimestamp(),
    });
    setInput("");
    ScrollToBottom();
  };

  return (
    <div className="h-full flex flex-col ">
      <div className="flex items-center px-3 py-2 border-b-2 border-black ">
        <Avatar />
        <div className="ml-5">
          <h4 className="font-bold text-sm">{roomName}</h4>
          <p className="text-xs">Last seen at 8:47 pm</p>
        </div>
        <IconButton onClick={handleClick} className="ml-auto">
          <MoreVertIcon />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <DeleteSweepOutlinedIcon className="text-red-500 mr-2" /> Delete
              Room
            </MenuItem>
          </Menu>
        </IconButton>
      </div>
      <div className="flex flex-1 p-3 flex-col overflow-y-scroll scrollbar-hide h-full">
        {messages.map((message) => (
          <>
            <Message
              key={message.data().id}
              id={message.id}
              message={message.data().message}
              messageSender={message.data().email}
              username={message.data().username}
              timestamp={message.data().timestamp}
            />
            <div className="mb-[20px]" ref={endOfMessageRef} />
          </>
        ))}
      </div>
      <form className="flex items-center border-t-2 border-black p-2">
        <IconButton className="px-2">
          <SentimentSatisfiedOutlinedIcon fontSize="medium" />
        </IconButton>
        <input
          className="flex flex-1 outline-none h-10 text-md placeholder-gray-700  border-b-2 border-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Enter a message:  ${user?.displayName.toLowerCase()}`}
        />
        <button hidden type="submit" disabled={!input} onClick={sendMessage}>
          send
        </button>
        <IconButton onClick={sendMessage}>
          <SendOutlinedIcon fontSize="medium" />
        </IconButton>
      </form>
    </div>
  );
};

export default ChatScreen;
