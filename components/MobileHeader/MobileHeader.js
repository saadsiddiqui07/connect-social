import Image from "next/image";
import logo from "../../assets/connect-logo.png";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HeaderIcon from "../../components/HeaderIcon/HeaderIcon";
import { Avatar } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { data } from "../../data/headerData";

import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import StickyNote2SharpIcon from "@mui/icons-material/StickyNote2Sharp";
import StorefrontSharpIcon from "@mui/icons-material/StorefrontSharp";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";

const MobileHeader = () => {
  const user = null;
  return (
    <div className="flex shadow-md sticky top-0 z-50 border-b-2 bg-white items-center pl-5 pr-5 pt-2 pb-2">
      <div className="flex w-full justify-center flex-grow ">
        <div className="cursor-pointer flex space-x-20 h-15">
          <div>
            <HomeSharpIcon />
          </div>
          <div>
            <StickyNote2SharpIcon />
          </div>
          <div>
            <StorefrontSharpIcon />
          </div>
          <div>
            <NotificationsActiveRoundedIcon />
          </div>
          <div>
            <ForumRoundedIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
