import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useStateValue } from "../context-api/StateProvider";
import { Avatar, IconButton, Button, Modal, Box } from "@mui/material";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Message from "../components/Message/Message";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  doc,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { style } from "../styles/modalStyle";

const ChatScreen = () => {
  const [{ user }] = useStateValue();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [newRoomName, setNewRoomName] = useState("");
  const [roomAdmin, setRoomAdmin] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const endOfMessageRef = useRef(null);
  const router = useRouter();
  const roomId = router.query.id;

  // edit new room name
  const handleUpdateRoomName = async () => {
    await updateDoc(doc(db, "chatRooms", roomId), {
      name: newRoomName,
    });
    setOpenModal(false);
    setNewRoomName("");
  };

  const openEditModal = () => {
    setOpenModal(true);
  };

  // fetch room info with --> roomId
  useEffect(() => {
    if (roomId) {
      onSnapshot(doc(db, "chatRooms", roomId), (snapshot) => {
        // set room name
        setRoomName(snapshot.data().name);
        setRoomAdmin(snapshot.data().createdBy);
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
      <Modal
        className="w-full"
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Box sx={style}>
          <h4 className="text-center font-sans">Update new room name</h4>
          {user?.email === roomAdmin ? (
            <>
              <div className="flex items-center px-2 py-2">
                <Avatar
                  className="h-10 object-contain rounded-full mr-2"
                  src={user?.photoURL}
                  alt="img"
                />
                <input
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  className="bg-transparent flex-1 ml-2 text-black text-sm border-1 border-b-2 outline-none"
                  placeholder="Enter email or username..."
                />
              </div>
              <Button
                disabled={!newRoomName}
                onClick={handleUpdateRoomName}
                color="primary"
                size="small"
                variant="contained"
                className="flex ml-auto mr-auto"
              >
                Edit
              </Button>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center p-2">
              <h4 className="text-gray-700 text-sm font-mono mb-2">
                You cannot update the room name as you are not the room admin.
              </h4>
              <Button
                color="error"
                size="small"
                variant="contained"
                onClick={() => setOpenModal(false)}
              >
                Close
              </Button>
            </div>
          )}
        </Box>
      </Modal>
      <div className="flex items-center px-3 py-2 border-b-2 border-black ">
        <Avatar />
        <div className="ml-5">
          <h4 className="font-bold text-sm">{roomName}</h4>
          <p className="text-xs">Last seen at 8:47 pm</p>
        </div>
        <IconButton onClick={openEditModal} className="ml-auto">
          <ModeEditOutlineOutlinedIcon className="text-blue-500" />
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
