"use client"

import { useRef, useState } from "react"
import Editor, { type Monaco } from "@monaco-editor/react"
import ActionButton from "@/components/action-buttons"  // Import ActionButton
import { editor } from "monaco-editor"

export default function CodeEditorPanel() {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const [currentCode, setCurrentCode] = useState("")

  // Configure Monaco editor on mount
  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor

    // Set editor options
    editor.updateOptions({
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      fontFamily: "'JetBrains Mono', 'Fira Code', Menlo, Monaco, 'Courier New', monospace",
      fontSize: 14,
      lineHeight: 1.5,
      fontLigatures: true,
      renderLineHighlight: "all",
      cursorBlinking: "smooth",
      cursorSmoothCaretAnimation: "on",
      smoothScrolling: true,
    })
  }

  return (
    <div className="h-full w-full flex flex-col">
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center justify-between">
        <h1 className="text-white">Code Editor</h1>
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          language="rust"  // You can change this to any language you want
          value={currentCode}
          theme="vs-dark"
          options={{
            readOnly: false,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            wordWrap: "on",
            wrappingIndent: "same",
            minimap: { enabled: true },
          }}
          onMount={handleEditorDidMount}
          onChange={(value) => setCurrentCode(value || "")}
        />
      </div>
      <ActionButton currentCode={currentCode} /> {/* Pass currentCode to ActionButton */}
    </div>
  )
}
