import Head from "next/head";
import Header from "../../components/Header/Header";
import MobileHeader from "../../components/MobileHeader/MobileHeader";
import ChatSidebar from "../../components/ChatComponents/Sidebar/ChatSidebar";
import styles from "../../styles/Home.module.css";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";

const Messages = () => {
  return (
    <div className={styles.message__container}>
      <Head>
        <title>Connect: Messages</title>
        <meta name="Messages" content="Socialize in a better way" />
      </Head>
      <Header />
      <div className="sm:hidden">
        <MobileHeader />
      </div>
      <div className="md:flex shadow-2xl m-3 h-[35rem] justify-center max-w-5xl  ml-auto mr-auto">
        <ChatSidebar />
        <div className="flex-1 items-center bg-gray-100">
          <div className="flex flex-col mt-[230px]  justify-center items-center">
            <StickyNote2OutlinedIcon className="text-5xl text-blue-600" />
            <p className="text-center font-medium  text-gray-600 text-xl ">
              Add a new user or Start a conversation !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
