import Head from "next/head";
import styles from "../styles/Home.module.css";
import MobileHeader from "../components/MobileHeader/MobileHeader";
import Header from "../components/Header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Feed from "../components/Feed/Feed";

// sm:bg-red-100 md:bg-green-100 lg:bg-blue-200 xl:bg-orange-300

export default function Home() {
  return (
    <div className={styles.home}>
      <Head>
        <title>Connect: Socialize in a better way!</title>
        <meta name="description" content="Socialize in a better way" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gray-100 h-screen">
        <Header />
        <div className="sm:hidden">
          <MobileHeader />
        </div>
        <div className="lg:flex items-center justify-between mt-8 ml-5 mr-5">
          <Sidebar />
          <Feed />
          <Sidebar />
        </div>
      </main>
    </div>
  );
}
