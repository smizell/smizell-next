import { Geneva } from "geneva";
import YAML from "yaml";

export default function GenevaDisplay({ children }) {
  const code = YAML.parse(children);
  const geneva = new Geneva();
  const result = geneva.run(code);
  return <code>{result}</code>;
}
