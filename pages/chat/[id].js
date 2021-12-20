import Head from "next/head";
import Header from "../../components/Header/Header";
import ChatSidebar from "../../components/ChatComponents/Sidebar/ChatSidebar";
import MobileHeader from "../../components/MobileHeader/MobileHeader";
import ChatScreen from "../../screens/ChatScreen";
import styles from "../../styles/Home.module.css";

const Chat = () => {
  return (
    <div className={styles.message__container}>
      <Head>
        <title>Connect: Chat</title>
        <meta name="Messages" content="Socialize in a better way" />
      </Head>
      <Header />
      <div className="sm:hidden">
        <MobileHeader />
      </div>
      <div className="hidden md:flex shadow-2xl m-3  h-[35rem] justify-center max-w-5xl  ml-auto mr-auto">
        <ChatSidebar />
        <div className="flex-1">
          <ChatScreen />
        </div>
      </div>
    </div>
  );
};

export default Chat;
