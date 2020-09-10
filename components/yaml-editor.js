import YAML from "yaml";
import { useState } from "react";
import AceEditor from "react-ace";
import RenderCode from "@/components/render-code";

import { Box, Button, Text } from "@chakra-ui/core";

require("ace-builds/src-noconflict/mode-yaml");
require("ace-builds/src-noconflict/theme-tomorrow");

export default function YAMLEditor({ children, onEdit, title, txt }) {
  const initialValue = txt !== undefined ? txt : YAML.stringify(children);
  const [editing, setEdit] = useState(false);
  const [value, setValue] = useState(initialValue);

  return (
    <>
      {editing && (
        <Box border="1px" borderColor="#aaa" rounded="md" p={4} mb={4}>
          <Text mt={0}>{title}</Text>
          <Box border="1px" borderColor="#ccc">
            <AceEditor
              mode="yaml"
              theme="tomorrow"
              value={value}
              setOptions={{ tabSize: 2 }}
              onChange={(newValue) => setValue(newValue)}
              showPrintMargin={false}
              width="100%"
              height="300px"
            />
          </Box>
          <Box pt={4}>
            <Button
              variantColor="green"
              size="sm"
              fontSize="90%"
              border={0}
              onClick={() => {
                setEdit(false);
                onEdit && onEdit(YAML.parse(value));
              }}
            >
              Done
            </Button>
          </Box>
        </Box>
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
