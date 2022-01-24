import Image from "next/image";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HeaderIcon from "../../components/HeaderIcon/HeaderIcon";
import { Avatar } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { data } from "../../data/headerData";
import { useStateValue } from "../../context-api/StateProvider";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import logo from "../../assets/connect-logo.png";

const Header = () => {
  const [{ user }, dispatch] = useStateValue();
  const router = useRouter();

  // handle user logout
  const handleSignOut = (e) => {
    e.preventDefault();
    // to let a user signOut
    signOut(auth)
      .then(() => {
        dispatch({
          type: "SET_USER",
          user: null,
        });
        router.push("/login");
        console.log("User signed out successfully");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex w-full shadow-lg top-0 sticky md:top-0 z-50 border-b-2 bg-white items-center pl-5 pr-5 pt-2 pb-2">
      <div className="w-full flex items-center">
        <Image
          src={logo}
          height={50}
          alt=""
          width={50}
          layout="fixed"
          objectFit="contain"
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />
        <div className="hidden xl:inline-flex  bg-gray-100 p-2 rounded-xl border-none">
          <SearchSharpIcon />
          <input
            className="bg-transparent w-10/12 text-black text-sm ml-3 border-0 outline-none"
            placeholder="Connect with users..."
          />
        </div>
      </div>
      <div className="flex w-full justify-center flex-grow ">
        <div className="flex space-x-5 md:space-x-2">
          {data.map((item) => (
            <HeaderIcon key={item.id} title={item.title} Icon={item.Icon} />
          ))}
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        {user ? (
          <>
            <div className="hidden md:inline-flex flex ml-auto space-x-5 items-center">
              <Avatar src={user?.photoURL} className="hidden sm:inline-flex" />
              <span className="hidden xl:inline-flex font-bold font-mono">
                {user?.displayName}
              </span>
            </div>
            <div
              onClick={handleSignOut}
              className="hidden md:inline-flex cursor-pointer rounded bg-black flex items-center p-2 ml-10"
            >
              <p className="hidden text-white font-bold mr-1">Logout</p>
              <ExitToAppIcon className="hidden md:inline-flex text-white" />
            </div>
          </>
        ) : (
          <>
            <div
              onClick={() => router.push("/login")}
              className="hidden: sm:inline-flex rounded cursor-pointer bg-black flex items-center p-2 ml-auto"
            >
              <p className="hidden sm:inline-flex text-white font-bold mr-2">
                Login
              </p>
              <ExitToAppIcon className="text-white" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
