import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Stephen Mizell</title>
      </Head>

      <main className={styles.main}>
        <h1>Stephen Mizell</h1>
        <p>Hi, I'm Stephen. This is my personal homepage.</p>
      </main>
    </div>
  );
}
