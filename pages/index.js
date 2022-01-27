import Head from "next/head";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import MobileHeader from "../components/MobileHeader/MobileHeader";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import SidebarAds from "../components/SidebarAds/SidebarAds";
import Feed from "../components/Feed/Feed";
import UploadButton from "../components/FloatingButton/UploadButton";
import { useStateValue } from "../context-api/StateProvider";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import Login from "../pages/login/index";

const Home = () => {
  const [{ user }, dispatch] = useStateValue();

  // check if the user is logged in or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      }
    });
    // clean up action
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  // redirect to login page
  if (!user) return <Login />;

  return (
    <div className={styles.home}>
      <Head>
        <title>Connect: Socialize in a better way!</title>
        <meta name="description" content="Socialize in a better way" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gray-100 h-full ">
        <Header />
        <div className="sm:hidden">
          <MobileHeader />
        </div>
        <div className="max-w-[1450px] ml-auto mr-auto  lg:flex  items-center justify-between mt-8 ">
          <Sidebar />
          <Feed />
          <SidebarAds />
        </div>
        <UploadButton />
      </main>
    </div>
  );
};

export default Home;
