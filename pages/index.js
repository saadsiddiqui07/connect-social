import Head from "next/head";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import MobileHeader from "../components/MobileHeader/MobileHeader";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Feed from "../components/Feed/Feed";
import UploadButton from "../components/FloatingButton/UploadButton";
import { useStateValue } from "../context-api/StateProvider";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import Login from "../pages/login/index";
// sm:bg-red-100 md:bg-green-100 lg:bg-blue-200 xl:bg-orange-300
export default function Home() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        console.log(authUser);
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
        <div className="lg:flex  items-center justify-between mt-8 ml-5 mr-5">
          <Sidebar />
          <Feed />
          <Sidebar />
        </div>
        <UploadButton />
      </main>
    </div>
  );
}
