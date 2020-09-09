import YAML from "yaml";
import { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-github";
import RenderCode from "@/components/render-code";

export default function YAMLEditor({ children, onEdit, title }) {
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
