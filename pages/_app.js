import "@/styles/prism.css";
import "../styles/globals.css";

import { MDXProvider } from "@mdx-js/react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/github";

import { Geneva, SimpleFS } from "geneva";
import YAML from "yaml";

function EvalGeneva({ children }) {
  const code = YAML.parse(children.trim());
  const geneva = new Geneva();
  const result = YAML.stringify(geneva.run(code));

  return (
    <>
      <RenderCode className="language-yaml" title="original">
        {children}
      </RenderCode>
      <RenderCode className="language-yaml" title="result">
        {result}
      </RenderCode>
    </>
  );
}

function ContextGeneva({ children }) {
  const context = YAML.parse(children.trim());
  const { scope, definition, files } = context;
  const show = context.show || {};
  const fs = new SimpleFS(files);
  const geneva = new Geneva({ initial: scope, fs });
  const result = YAML.stringify(geneva.run(definition));

  return (
    <>
      {show.scope && (
        <RenderCode className="language-yaml" title="scope">
          {YAML.stringify(scope)}
        </RenderCode>
      )}
      {show.files && (
        <RenderCode className="language-yaml" title="files">
          {YAML.stringify(files)}
        </RenderCode>
      )}
      {show.definition && (
        <RenderCode className="language-yaml" title="definition">
          {YAML.stringify(definition)}
        </RenderCode>
      )}
      {show.result && (
        <RenderCode className="language-yaml" title="result">
          {result}
        </RenderCode>
      )}
    </>
  );
}

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

function RenderCode({ className, children, title }) {
  const language = className.replace(/language-/, "").split(":");

  return (
    <Highlight
      {...defaultProps}
      code={children.trim()}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <>
          {title && <div className="code-title">{title}</div>}
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        </>
      )}
    </Highlight>
  );
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
