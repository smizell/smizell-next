import YAML from "yaml";
import { useState } from "react";
import { Geneva } from "geneva";
import RenderCode from "@/components/render-code";
import YAMLEditor from "@/components/yaml-editor";

export default function ContextGeneva({ children }) {
  const context = YAML.parse(children.trim());
  const show = context.show || {};
  const [scope, setScope] = useState(context.scope);
  const [definition, setDefinition] = useState(context.definition);
  const [files, setFiles] = useState(context.files);

  const geneva = new Geneva({ fs: new SimpleFS(files) });
  const runtime = geneva.buildRuntime();

  for (const prop in scope) {
    runtime.run({
      "fn:def": [prop, scope[prop]],
    });
  }

  const result = YAML.stringify(runtime.run(definition)).trim();

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
