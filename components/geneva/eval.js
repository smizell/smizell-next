import Code from "@/components/code";
import { Geneva } from "geneva";
import YAML from "yaml";

export default function GenevaEval({ children, title = "results" }) {
  console.log(children);
  const code = YAML.parse(children.trim());
  const geneva = new Geneva();
  const result = YAML.stringify(geneva.run(code));
  return (
    <>
      <Code language="yaml" title="code">
        {children}
      </Code>
      <Code language="yaml" title={title}>
        {result}
      </Code>
    </>
  );
}
