import Head from "next/head";
import Link from "next/link";
import { Box } from "@chakra-ui/core";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Stephen Mizell's Presentations</title>
      </Head>

      <main>
        <h1>Hi, I'm Stephen Mizell</h1>
        <p>This is just a placeholder for now.</p>
        <Box>
          <Link href="/asc2020/">ASC 2020 Presentation</Link>
        </Box>
      </main>
    </div>
  );
}
