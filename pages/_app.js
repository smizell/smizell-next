import "@/styles/prism.css";
import "@/styles/globals.css";

import { theme, Box, Code, Heading, Kbd, Text } from "@chakra-ui/core";

import { MDXProvider } from "@mdx-js/react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

import EvalGeneva from "@/components/geneva/eval";
import ContextGeneva from "@/components/geneva/context";
import RenderCode from "@/components/render-code";

function CodeBlock({ className, children }) {
  const [_, info] = className.replace(/language-/, "").split(":");

  if (info === "geneva-eval") {
    return <EvalGeneva className={className}>{children}</EvalGeneva>;
  } else if (info === "geneva-context") {
    return <ContextGeneva className={className}>{children}</ContextGeneva>;
  } else {
    return <RenderCode className={className}>{children}</RenderCode>;
  }
}

const components = {
  h1: (props) => <Heading as="h1" size="xl" my={4} {...props} />,
  inlineCode: (props) => (
    <Code variantColor="yellow" fontSize="0.84em" {...props} />
  ),
  kbd: Kbd,
  br: (props) => <Box height="24px" {...props} />,
  p: (props) => <Text as="p" mt={4} lineHeight="tall" {...props} />,
  ul: (props) => <Box as="ul" pt={2} pl={4} ml={2} {...props} />,
  ol: (props) => <Box as="ol" pt={2} pl={4} ml={2} {...props} />,
  li: (props) => <Box as="li" pb={3} lineHeight="tall" {...props} />,
  code: CodeBlock,
};

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </ThemeProvider>
  );
}

export default App;
