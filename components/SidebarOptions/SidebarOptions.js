import { Avatar } from "@mui/material";
import { useStateValue } from "../../context-api/StateProvider";

const SidebarOptions = ({ username, profilePic }) => {
  const [{ user }] = useStateValue();
  // if logged in as a user then do not list in sidebar
  if (user?.displayName === username) return null;
  return (
    <div
      className="flex mt-5 pl-5 pr-10  items-center 
    cursor-pointer transition duration-100 transform hover:bg-gray-200 hover:scale-110 "
    >
      <Avatar src={profilePic} />
      <div className="hidden lg:inline-flex">
        <p className="text-xs font-bold text-gray-500 ml-3">{username.split(" ").join("").toLowerCase()}</p>
      </div>
    </div>
  );
};

export default SidebarOptions;
