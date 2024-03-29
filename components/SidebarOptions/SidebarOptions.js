import { Avatar } from "@mui/material";

const SidebarOptions = ({ avatar, firstName, lastName }) => {
  return (
    <div
      className="flex mt-5 pl-5 pr-10  items-center 
    cursor-pointer transition duration-100 transform hover:bg-gray-200 hover:scale-110 "
    >
      <Avatar src={avatar} />
      <div className="hidden lg:inline-flex">
        <p className="text-xs font-bold text-gray-500 ml-3">
          {firstName} {lastName}
        </p>
      </div>
    </div>
  );
};

export default SidebarOptions;
