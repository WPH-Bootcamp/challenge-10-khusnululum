"use client";

import { useEffect, useRef } from "react";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function RichTextEditor({ value, onChange }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (editorRef.current && isFirstLoad.current) {
      editorRef.current.innerHTML = value || "";
      isFirstLoad.current = false;
    }
  }, [value]);

  function exec(cmd: string, value?: string) {
    editorRef.current?.focus();
    document.execCommand(cmd, false, value);
    onChange(editorRef.current?.innerHTML || "");
  }

  function setHeading(level: number | "p") {
    exec("formatBlock", level === "p" ? "p" : `h${level}`);
  }

  return (
    <div className="border border-neutral-300 rounded-lg overflow-hidden">
      {/* ===== TOOLBAR ===== */}
      <div className="flex flex-wrap gap-1 border-b border-neutral-300 p-2 text-sm">
        {/* Heading */}
        <select
          onChange={(e) =>
            setHeading(e.target.value === "p" ? "p" : Number(e.target.value))
          }
          className="border border-neutral-300 rounded px-2 py-1 text-sm mx-1 my-1"
        >
          <option value="p">Normal</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
        </select>
        <div className="flex gap-4 border-l border-neutral-300 h-4 my-auto pl-4 pr-4">
          <button onClick={() => exec("bold")} className="editor-btn">
            <img src="/bold.svg" alt="Bold Icon" />
          </button>
          <button onClick={() => exec("italic")} className="editor-btn">
            <img src="/italic.svg" alt="Italic Icon" />
          </button>
          <button onClick={() => exec("strikeThrough")} className="editor-btn">
            <img src="/strikethrough.svg" alt="Strikethrough Icon" />
          </button>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => exec("insertUnorderedList")}
            className="editor-btn border-l border-neutral-300 pl-4 h-4 my-auto"
          >
            <img src="/unorderedList.svg" alt="Unordered List Icon" />
          </button>
          <button
            onClick={() => exec("insertOrderedList")}
            className="editor-btn pr-4"
          >
            <img src="/orderedList.svg" alt="Ordered List Icon" />
          </button>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => exec("justifyLeft")}
            className="editor-btn border-l border-neutral-300 pl-4 h-4 my-auto"
          >
            <img src="/justifyLeft.svg" alt="Justify Left Icon" />
          </button>
          <button onClick={() => exec("justifyCenter")} className="editor-btn">
            <img src="/justifyCenter.svg" alt="Justify Center Icon" />
          </button>
          <button onClick={() => exec("justifyRight")} className="editor-btn">
            <img src="/justifyRight.svg" alt="Justify Right Icon" />
          </button>
          <button
            onClick={() => exec("justifyFull")}
            className="editor-btn pr-4"
          >
            <img src="/justifyFull.svg" alt="Justify Full Icon" />
          </button>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => {
              const url = prompt("Insert link");
              if (url) exec("createLink", url);
            }}
            className="editor-btn border-l border-neutral-300 pl-4 h-4 my-auto"
          >
            <img src="/link.svg" alt="Link Icon" />
          </button>

          <button onClick={() => exec("unlink")} className="editor-btn">
            <img src="/unlink.svg" alt="Unlink Icon" />
          </button>

          <button
            onClick={() => {
              const url = prompt("Image URL");
              if (url) exec("insertImage", url);
            }}
            className="editor-btn"
          >
            <img src="/image.svg" alt="Image Icon" />
          </button>
        </div>
      </div>

      {/* ===== EDITOR ===== */}
      <div
        ref={editorRef}
        contentEditable
        dir="ltr"
        className="min-h-50 p-3 text-sm outline-none rounded-md"
        onInput={() => {
          onChange(editorRef.current?.innerHTML || "");
        }}
      />
    </div>
  );
}
