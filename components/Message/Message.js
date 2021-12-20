import { Avatar } from "@mui/material";
import { useStateValue } from "../../context-api/StateProvider";

const Message = ({ sender }) => {
  const [{ user }] = useStateValue();

  return (
    <div className={`${sender ? "user" : "recipient"}`}>
      <Avatar
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt={user?.displayName[0]}
        className="profile_picture"
      />
      <div className={`${sender ? "user__message" : "recipient__message"}`}>
        <p className="text-sm font-bold">
          Hey how are you and how's your work going on?
        </p>
        <small className={sender ? "text-red" : "text-green-50"}>8:45 pm</small>
      </div>
    </div>
  );
};

export default Message;
