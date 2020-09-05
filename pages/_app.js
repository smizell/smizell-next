import "@/styles/prism.css";
import "../styles/globals.css";

import { MDXProvider } from "@mdx-js/react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/github";
import { useState } from "react";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-github";

import { Geneva, SimpleFS } from "geneva";
import YAML from "yaml";

function EvalGeneva({ children }) {
  const [definition, setDefinition] = useState(YAML.parse(children.trim()));
  const geneva = new Geneva();
  const result = YAML.stringify(geneva.run(definition));

  return (
    <>
      <YAMLEditor
        onEdit={(newDefinition) => setDefinition(newDefinition)}
        title="definition"
      >
        {definition}
      </YAMLEditor>
      <RenderCode className="language-yaml" title="result">
        {result}
      </RenderCode>
    </>
  );
}

function YAMLEditor({ children, onEdit, title }) {
  const [editing, setEdit] = useState(false);
  const [value, setValue] = useState(YAML.stringify(children));

  return (
    <>
      {editing && (
        <div>
          <AceEditor
            mode="yaml"
            theme="github"
            value={value}
            setOptions={{ tabSize: 2 }}
            onChange={(newValue) => setValue(newValue)}
          />
          <button
            onClick={() => {
              setEdit(false);
              onEdit && onEdit(YAML.parse(value));
            }}
          >
            Done
          </button>
        </div>
      )}

      {!editing && (
        <div>
          <div className="code-title">
            {title} (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setEdit(true);
              }}
            >
              edit
            </a>
            )
          </div>
          <RenderCode className="language-yaml">{value}</RenderCode>
        </div>
      )}
    </>
  );
}

function ContextGeneva({ children }) {
  const context = YAML.parse(children.trim());
  const show = context.show || {};
  const [scope, setScope] = useState(context.scope);
  const [definition, setDefinition] = useState(context.definition);
  const [files, setFiles] = useState(context.files);

  const fs = new SimpleFS(files);
  const geneva = new Geneva({ initial: scope, fs });
  const result = YAML.stringify(geneva.run(definition)).trim();

  return (
    <>
      {show.scope && (
        <YAMLEditor onEdit={(newScope) => setScope(newScope)} title="variables">
          {scope}
        </YAMLEditor>
      )}
      {show.files && (
        <YAMLEditor onEdit={(newFiles) => setFiles(newFiles)} title="files">
          {files}
        </YAMLEditor>
      )}
      {show.definition && (
        <YAMLEditor
          onEdit={(newDefinition) => setDefinition(newDefinition)}
          title="definition"
        >
          {definition}
        </YAMLEditor>
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
