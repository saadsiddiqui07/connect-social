import { Avatar } from "@mui/material";
import { useStateValue } from "../../context-api/StateProvider";

const Message = ({ message, messageSender, profileImg, timestamp }) => {
  const [{ user }] = useStateValue();
  // check if the message being sent is by the logged in user
  const sender = user?.email === messageSender;

  return (
    <div className={`${sender ? "user" : "recipient"}`}>
      <Avatar
        src={profileImg}
        alt={user?.displayName[0]}
        className="profile_picture"
      />
      <div className={`${sender ? "user__message" : "recipient__message"}`}>
        <p className="text-sm font-bold">{message}</p>
        <small>{new Date(timestamp?.toDate()).toLocaleDateString()}</small>
      </div>
    </div>
  );
};

export default Message;
