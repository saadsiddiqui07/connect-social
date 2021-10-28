import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header/Header";

export default function Home() {
  return (
    <div className={styles.home}>
      <Head>
        <title>Connect: Socialize in a better way!</title>
        <meta name="description" content="Socialize in a better way" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
    </div>
  );
}
