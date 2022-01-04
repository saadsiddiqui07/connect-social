import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Avatar } from "@mui/material";
import { useStateValue } from "../../../context-api/StateProvider";
import { truncateText } from "../../../utils/truncateText";
import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

const Chat = ({ id, chatName, image }) => {
  const [lastMessage, setLastMessage] = useState([]);
  const [{ user }] = useStateValue();
  const router = useRouter();

  // redirect to a chat Room
  const handleOpenChat = () => {
    router.push(`/messages/${id}`);
  };

  // fetch last message of every chat
  useEffect(() => {
    if (id) {
      onSnapshot(
        query(
          collection(db, "chatRooms", id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setLastMessage(snapshot.docs);
        }
      );
    }
  }, [id]);

  return (
    <div
      id={id}
      onClick={handleOpenChat}
      className="flex cursor-pointer items-center px-2 py-2 border-b-[1px] border-gray-400 hover:bg-gray-200 text-white transition-opacity "
    >
      <Avatar className="h-9 w-9" src={image} />
      <div className="ml-3">
        <h4 className="font-bold text-sm text-black">{chatName}</h4>
        <p className="text-xs text-black">
          {truncateText(lastMessage[0]?.data().message, 42)}
        </p>
      </div>
    </div>
  );
};

export default Chat;
