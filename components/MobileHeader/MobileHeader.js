import { useRouter } from "next/router";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import StickyNote2SharpIcon from "@mui/icons-material/StickyNote2Sharp";
import StorefrontSharpIcon from "@mui/icons-material/StorefrontSharp";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";

const MobileHeader = () => {
  const router = useRouter();
  return (
    <div className="flex shadow-md sticky top-0 z-50 border-b-2 bg-white items-center pl-5 pr-5 pt-2 pb-2">
      <div className="flex w-full justify-center flex-grow ">
        <div className="cursor-pointer flex space-x-10 h-15">
          <div onClick={() => router.push("/")}>
            <HomeSharpIcon fontSize="large" />
          </div>
          <div onClick={() => router.push("/news")}>
            <StickyNote2SharpIcon fontSize="large" />
          </div>
          <div onClick={() => router.push("/market")}>
            <StorefrontSharpIcon fontSize="large" />
          </div>
          <div onClick={() => router.push("/messages")}>
            <ForumRoundedIcon fontSize="large" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
