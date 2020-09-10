import Head from "next/head";
import Navigation from "@/components/navigation";
import { Heading } from "@chakra-ui/core";

export default function Index({ children, frontMatter }) {
  return (
    <>
      <Head>
        <title>{frontMatter.title}</title>
        <meta
          name="description"
          content="Presentation by Stephen Mizell at ASC2020 on a tool called Geneva"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@Stephen_Mizell" />
        <meta name="og:url" content="https://present.smizell.com/" />
        <meta name="og:title" content="Stephen Mizell" />
        <meta
          name="og:description"
          content="Making OpenAPI and AsyncAPI Dynamic with Geneva"
        />
      </Head>
      <main>
        <Navigation />
        <Heading as="h1" size="xl" my={4}>
          {frontMatter.title}
        </Heading>
        {children}
      </main>
    </>
  );
}
