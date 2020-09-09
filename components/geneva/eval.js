import { useState } from "react";
import { Geneva } from "geneva";
import YAML from "yaml";
import RenderCode from "@/components/render-code";
import YAMLEditor from "@/components/yaml-editor";

export default function EvalGeneva({ children }) {
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
