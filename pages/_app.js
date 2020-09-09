import "@/styles/prism.css";
import "@/styles/globals.css";

import { MDXProvider } from "@mdx-js/react";
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
  code: CodeBlock,
};

function MyApp({ Component, pageProps }) {
  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}

export default MyApp;
