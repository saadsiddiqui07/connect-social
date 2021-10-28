import Image from "next/image";
import logo from "../../assets/connect-logo.png";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import StickyNote2SharpIcon from "@mui/icons-material/StickyNote2Sharp";
import StorefrontSharpIcon from "@mui/icons-material/StorefrontSharp";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HeaderIcon from "../../components/HeaderIcon/HeaderIcon";
import { Avatar } from "@mui/material";

const Header = () => {
  const user = null;
  return (
    <div className="flex shadow-lg sticky border-b-2 bg-white items-center pl-5 pr-5 pt-2 pb2">
      <div className="w-full flex items-center">
        <Image
          src={logo}
          height={50}
          width={50}
          layout="fixed"
          objectFit="contain"
        />
        <div className="bg-gray-100 p-2 rounded-xl border-none">
          <SearchSharpIcon />
          <input
            className="bg-transparent w-10/12 text-black text-sm ml-3 border-0 outline-none"
            placeholder="Connect with users..."
          />
        </div>
      </div>
      <div className="flex w-full justify-center flex-grow ">
        <div className="flex space-x-5 md:space-x-2">
          <HeaderIcon Icon={HomeSharpIcon} />
          <HeaderIcon Icon={StickyNote2SharpIcon} />
          <HeaderIcon Icon={StorefrontSharpIcon} />
          <HeaderIcon Icon={NotificationsActiveRoundedIcon} />
          <Header Icon={ForumRoundedIcon} />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        {user ? (
          <>
            <div className="flex ml-auto space-x-5 items-center">
              <Avatar className="" />
              <span className="font-bold">Saad Siddiqui</span>
            </div>
            <div className="cursor-pointer rounded bg-black flex items-center p-2 ml-10">
              <p className="text-white font-bold mr-1">Logout</p>
              <ExitToAppIcon className="text-white" />
            </div>
          </>
        ) : (
          <>
            <div className="ml-auto cursor-pointer rounded bg-black flex items-center p-2 ml-10">
              <p className="text-white font-bold mr-2">Login</p>
              <ExitToAppIcon className="text-white" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
